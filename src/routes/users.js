const express = require('express');
const route = express.Router();

const UserController = require('../controllers/UserController');

/* GET users listing. */
route.get('/', UserController.getUsers);
route.get('/:id', UserController.getUser);
route.post('/', UserController.setUser);
route.put('/:id', UserController.putUser);
route.delete('/:id', UserController.delUser);

module.exports = route;
