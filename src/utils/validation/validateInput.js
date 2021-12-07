const Joi = require('joi');

const schema = Joi.object({
  userName: Joi.string().required().min(3),
  userEmail: Joi.string().required().min(3),
  userPassword: Joi.string().required().min(3)
});

function validateInput(value) {    
  const result = schema.validate(value); 
  return result;
  };

module.exports = validateInput;
