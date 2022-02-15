
const { User } = require('../models');
const validateInput = require('../utils/validation/validateInput');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  constructor() {
  }

  async getUsers(req, res) {
    const users = await User.findAll();
    if (users.length === 0) return res.status(200).send({ "Status": "No users found" });
    console.log(`Loged user: ID: ${req.userId}, EMAIL: ${req.userEmail} `)
    res.send(users);
  }

  async getUser(req, res) {
    const id = parseInt(req.params.id);
    const user = await User.findAll({
      where: { id: id }
    })
    if (user.length === 0) return res.status(200).send({ "Status": "No user found" });
    return res.send(user);
  }

  async setUser(req, res) {
    const schemaValidated = validateInput(req.body);
    if (schemaValidated.error) return res.status(400).send(schemaValidated.error.details);
    const input = {
      name: req.body.userName,
      email: req.body.userEmail,
      password: req.body.userPassword
    };
    const user = await User.create({
      name: input.name,
      email: input.email,
      password: input.password
    });
    if (user) return res.status(200).send(user);
  }

  async putUser(req, res) {
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
    if (user) return res.status(200).send(user);
  }

  async delUser(req, res) {
    const id = parseInt(req.params.id);
    const user = await User.destroy({
      where: {
        id: id
      }
    });
    if (user) return res.status(200).send(user);
  }

  async logIn(req, res) {
    // const schemaValidated = validateInput(req.body);
    //  if (schemaValidated.error) return res.status(400).send(schemaValidated.error);
    const input = {
      email: req.body.userEmail,
      password: req.body.userPassword
    };

    const user = await User.findOne({ where: { email: input.email } });
    if (user === null) return res.status(401).send({ "Error": "User not found" });
    const pwdCheck = input.password === user.password ? true : false;
    if (pwdCheck === false) return res.status(401).send({ "Error": "Wrong password" });

    const token = jwt.sign({
      userId: user.id,
      userEmail: user.email
    },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    user.dataValues.token = token;
    console.log(user.dataValues);
    return res.status(200).send({ "authtoken": user.dataValues.token });
  }
};

module.exports = new UserController();
