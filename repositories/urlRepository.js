import connection from '../database/database.js';

async function createShortUrl(id, shortUrl, url){
    await connection.query(`
    INSERT INTO urls ("userId", "shortUrl", url) 
    VALUES ($1, $2, $3)`, [id, shortUrl, url])
}

async function getShortUrl(shortUrl){
    return await connection.query(`
    SELECT "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl])
  
}

async function getById(id){
    return await connection.query(`SELECT id, "userId" ,"shortUrl", url FROM urls WHERE id = $1`, [id])
}

async function openUrl(shortUrl){
    return await connection.query(`SELECT url FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

async function visitCountIncrement(shortUrl){
    await connection.query(`
        UPDATE urls SET "visitCount" = "visitCount"+1 WHERE "shortUrl" = $1`, [shortUrl])
}

async function deleteById (id){
    await connection.query(`DELETE FROM urls WHERE id=$1`, [id])
}
export {createShortUrl, getShortUrl, getById, openUrl, visitCountIncrement, deleteById}