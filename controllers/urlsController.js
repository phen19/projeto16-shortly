import connection from '../database/database.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { nanoid } from 'nanoid';
dotenv.config();


export async function shortenUrl(req, res){
    try{
    const url = req.body.url
    const shortUrl = nanoid(8)
    const id = res.locals.userId

    await connection.query(`
    INSERT INTO urls ("userId", url, "shortUrl") 
    VALUES ($1, $2, $3)`, [id, url, shortUrl])
    
    const shortUrlcreated = await connection.query(`
    SELECT "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl])
    console.log(shortUrlcreated)
    res.status(201).send(shortUrlcreated.rows[0])
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getUrlById (req, res){
    try{
        const id = req.params.id

        const url = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id])

        if(url.rowCount === 0){
            res.status(404).send('não existe')
        }

        res.status(200).send(url.rows[0])
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function openShortUrl(req, res){
    try{
        const shortUrl = req.params.shortUrl;
        const url = await connection.query(`SELECT url FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        
        if(url.rowCount === 0){
            res.status(404).send('não existe')
        }
        console.log(url.rows[0].url)
        res.status(200).redirect(url.rows[0].url)
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res){
    try{
        const id = res.locals.id
        await connection.query(`DELETE FROM urls WHERE id=$1`, [id])
        res.status(204).send("deletado")
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}