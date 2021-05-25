const Joi = require('joi');

const validRegister = user => {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(255).required(),
        lastName: Joi.string().trim().min(3).max(255).required(),
        username: Joi.string().trim().min(3).max(255).required(),
        email: Joi.string().trim().min(3).max(255).required().email(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

const validLogin = user => {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(255).required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports.validRegister = validRegister;
module.exports.validLogin = validLogin;
