const Joi = require('joi');

function validateInput(value) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().min(3),
        password: Joi.string().required().min(3)
    });
    return schema.validate(value);    
  };

module.exports = validateInput;
