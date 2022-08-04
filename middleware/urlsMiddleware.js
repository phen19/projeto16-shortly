import connection from '../database/database.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { nanoid } from 'nanoid';
dotenv.config();

export async function validateUrlDeletion(req, res, next){
    const id = req.params.id
        const userId = res.locals.userId
        const url = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id])

        if( url.rowCount ===0){
            res.status(404).send('não existe')
            return
        }
        if (url.rows[0].userId !== userId){
            res.status(401).send('usuário nao é o dono do link')
            return
        }
    res.locals.id = id
    next()
}