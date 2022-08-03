import connection from '../database/database.js';
import registerSchema from '../schemas/usersSchema.js'
import bcrypt from 'bcrypt'

export async function validateUser(req,res,next){
   
    const user = req.body
    const validation = registerSchema.validate(user,{abortEarly: false});

    const passwordHash = bcrypt.hashSync(user.password, 10);


    if(validation.error){
        res.status(422).send(validation.error.details.map(item => item.message))
        return
    }
    delete user.confirmPassword

    try {
        const existingUser = await connection.query('SELECT * FROM users WHERE name = $1', [user.name])
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