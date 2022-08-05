import joi from 'joi';


const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
});



const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const newUrlSchema = joi.object({
  url: joi.string().uri().required()
})
export {registerSchema, loginSchema, newUrlSchema}