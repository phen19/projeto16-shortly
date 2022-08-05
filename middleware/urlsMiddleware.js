import dotenv from "dotenv";
import { getById } from '../repositories/urlRepository.js';
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