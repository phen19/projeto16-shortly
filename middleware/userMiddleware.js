import {registerSchema, loginSchema} from '../schemas/schemas.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail} from "../repositories/userRepository.js"
dotenv.config();

export async function validateUser(req, res, next){
   
    const user = req.body
    const validation = registerSchema.validate(user,{abortEarly: false});
    const passwordHash = bcrypt.hashSync(user.password, 10);


    if(validation.error){
        res.status(422).send(validation.error.details.map(item => item.message))
        return
    }
    delete user.confirmPassword

    try {
        const existingUser = await getUserByEmail(user.email)
        if (existingUser.rowCount !== 0) {
            return res.sendStatus(409);
        }
        user.password = passwordHash;
        res.locals.user = user;

    } catch (err){
        console.error(err);
        res.sendStatus(500)
    }
    
    next();
}

export async function validateSignIn(req, res, next){
    const validation = loginSchema.validate(req.body, {abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map(item=> item.message))
    }

    next()
}

export async function verifyJWT( req, res, next){
    const { authorization} = req.headers;
    const token = authorization?.replace('Bearer ','');

    if(!token) return res.status(401).send("Token não enviado")

    jwt.verify(token, process.env.JWT_KEY, function (err, decoded){
        if(err) return res.status(401).send("Falha na autenticação")

        res.locals.userId = decoded.id
        next()
    })

}
