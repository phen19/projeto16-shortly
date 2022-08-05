import connection from '../database/database.js';

async function getUserRanking(){ 
    const ranking = await connection.query(`
        SELECT u.id, u.name, COUNT(CASE WHEN ur."userId" = u.id THEN u.id END) AS "linksCount", COALESCE(SUM(ur."visitCount"),0) AS "visitCount"
        FROM users u
        LEFT JOIN urls ur ON ur."userId"= u.id
        GROUP BY u.id
        ORDER BY "visitCount" DESC, "linksCount" DESC, u.name
        LIMIT 10`)
       return ranking.rows 
}

async function getUrlUser(id) {
    const urls = await connection.query(`
        SELECT u.id, u.name, COALESCE(SUM(ur."visitCount"),0) AS "visitCount",
        json_agg(jsonb_build_object(
            'id', ur.id,
            'shortUrl', ur."shortUrl",
            'url', ur.url,
            'visitCount', ur."visitCount"
            )) AS "shortenedUrls"
        FROM users u
        LEFT JOIN urls ur ON ur."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id
        `, [id])
       
    return urls.rows[0]
} 

async function getUserByEmail(email){

    const user = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
    return user
}

async function createUser(name, email, password){

    return await connection.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`, [name, email, password])

}
export {getUserRanking, getUrlUser, getUserByEmail, createUser}