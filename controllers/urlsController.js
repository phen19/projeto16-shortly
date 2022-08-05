import dotenv from "dotenv";
import { nanoid } from 'nanoid';
import { createShortUrl, getById, getShortUrl, openUrl, visitCountIncrement, deleteById } from '../repositories/urlRepository.js';
dotenv.config();


export async function shortenUrl(req, res){
    try{
    const url = req.body.url
    const shortUrl = nanoid(8)
    const id = res.locals.userId

    await createShortUrl(id, shortUrl, url)
    
    const shortUrlcreated = await getShortUrl(shortUrl)
    res.status(201).send(shortUrlcreated.rows[0])
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getUrlById (req, res){
    try{
        const id = req.params.id

        const url = await getById(id)

        if(url.rowCount === 0){
            res.status(404).send('não existe')
        }
        delete url.rows[0].userId

        res.status(200).send(url.rows[0])
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function openShortUrl(req, res){
    try{
        const shortUrl = req.params.shortUrl;
        const url = await openUrl(shortUrl)
        
        if(url.rowCount === 0){
            res.status(404).send('não existe')
            return
        }
        
        await visitCountIncrement(shortUrl)
        res.status(200).redirect(url.rows[0].url)
    
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res){
    try{
        const id = res.locals.id
        await deleteById(id)
        res.status(204).send("deletado")
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}