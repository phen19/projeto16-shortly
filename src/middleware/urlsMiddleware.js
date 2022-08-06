import dotenv from "dotenv";
import {newUrlSchema} from '../schemas/schemas.js'
import { checkUrlUser, getById } from '../repositories/urlRepository.js';
dotenv.config();

export async function validateUrlDeletion(req, res, next){
    const id = req.params.id
        const userId = res.locals.userId
        const url = await getById(id)

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

export async function validateNewUrl(req, res, next){
    const validation = newUrlSchema.validate(req.body, {abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map(item=> item.message))
    }
    
    const url = req.body.url
    const id = res.locals.userId
    const check = await checkUrlUser(url,id)
    
    if(check.rowCount!==0){
        res.status(409).send('Você já encurtou esse link!')
        return
    }

    res.locals.url = url

    next()
}