const { User } = require('../db/models/');
const validateInput = require('../utils/validation/validateInput');

class UserController{
  constructor(){
  }
      
  async getUsers(req, res){
    const users = await User.findAll();
    if (users.length === 0) return res.status(404).send();   
    res.send(users);
  }

  async getUser(req, res){
    const id = parseInt(req.params.id);
    const user = await User.findAll({
      where: { id: id }
    })
    if (user.length === 0) return res.status(404).send();        
    return res.send(user);
  } 
  
  async setUser(req, res){
    const schemaValidated = validateInput(req.body);
    if (schemaValidated.error) return res.status(400).send(schemaValidated.error);      
    const input = {
      name: req.body.userName,
      email: req.body.userEmail,
      password: req.body.userPassword
    };

  console.log(input);
    const user = await User.create({ 
      name: input.name, 
      email: input.email, 
      password: input.password 
    });
    if(user) return res.status(200).send(user);      
  }

  async putUser(req, res){
    const schemaValidated = validateInput(req.body);
    if (schemaValidated.error) return res.status(400).send(schemaValidated.error);      
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const id = parseInt(req.params.id);
    const user = await User.update({ 
      name: input.name, 
      email: input.email, 
      password: input.password 
    }, {
      where: {
        id: id
      }
    });
    if(user) return res.status(200).send(user);    
  }

  async delUser(req, res){
    const id = parseInt(req.params.id);
    const user = await User.destroy({
      where: {
        id: id
      }
    });
    if (user) return res.status(200).send(user);
  }
}

module.exports = new UserController();
