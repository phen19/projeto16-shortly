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

    res.sendStatus(201)
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}
