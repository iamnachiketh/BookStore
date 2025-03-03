const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string(),
    phone: Joi.string().length(10).required(),
    refreshtoken: Joi.string()
});

const userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    userSchema,
    userLogin
}