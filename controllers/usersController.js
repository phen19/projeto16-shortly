import connection from '../database/database.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function signUpUser(req, res){
    try{
    const user = res.locals.user
    
    await connection.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`, [user.name, user.email, user.password])

    res.sendStatus(201)
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function signInUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
        if (user.rowCount >0 && bcrypt.compareSync(password, user.rows[0].password)) {
            const token = jwt.sign(
                {
                    id: user.rows[0].id,
                    name: user.rows[0].name
                },
                process.env.JWT_KEY,
                {expiresIn: '15m'}
            );
            res.status(200).send({
                message: "Authentication Success ",
                token: token
            });
        }
        else {
            res.status(401).send("Authentication Failure");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Bad Request");
    }
}

async function getUrlsByUser(req, res){
    const id = res.locals.userId

    try{
        const urls = await connection.query(`
        SELECT u.id, u.name, SUM(ur."visitCount") AS "visitCount",
        json_agg(jsonb_build_object(
            'id', ur.id,
            'shortUrl', ur."shortUrl",
            'url', ur.url,
            'visitCount', ur."visitCount"
            )) AS "shortenedUrls"
        FROM users u
        JOIN urls ur ON ur."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id
        `, [id])
        console.log(id)
            console.log(urls)
        res.status(200).send(urls.rows[0])
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function getRanking(req,res){

    try{
        const ranking = await connection.query(`SELECT u.id, u.name, COUNT(CASE WHEN ur."userId" = u.id THEN u.id END) AS "linksCount", SUM(ur."visitCount") AS "visitCount"
        FROM users u
        LEFT JOIN urls ur ON ur."userId"= u.id
        GROUP BY u.id
        ORDER BY "visitCount" DESC
        LIMIT 10`)

        res.status(200).send(ranking.rows)
    } catch (err){
        console.error(err);
        res.sendStatus(500)
    }
}

export { signUpUser, signInUser, getUrlsByUser, getRanking };