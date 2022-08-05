import connection from '../database/database.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, getUrlUser, getUserByEmail, getUserRanking } from '../repositories/userRepository.js';
dotenv.config();

async function signUpUser(req, res){
    try{

    const user = res.locals.user
    await createUser(user.name, user.email, user.password)
    res.sendStatus(201)
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function signInUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email)
        console.log(user)
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
        const info = await getUrlUser(id)
        res.status(200).send(info)
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function getRanking(req,res){

    try{
        const ranking = await getUserRanking()
        res.status(200).send(ranking)
    } catch (err){
        console.error(err);
        res.sendStatus(500)
    }
}

export { signUpUser, signInUser, getUrlsByUser, getRanking };