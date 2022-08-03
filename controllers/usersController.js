import connection from '../database/database.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUpUser(req, res){
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