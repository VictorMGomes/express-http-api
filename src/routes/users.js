const express = require('express');
const route = express.Router();
const loginRequired = require('../middlewares/loginRequired')

const UserController = require('../controllers/UserController');

/* GET users listing. */
route.get('/', loginRequired, UserController.getUsers);
route.get('/:id', UserController.getUser);
route.post('/', UserController.setUser);
route.put('/:id', UserController.putUser);
route.delete('/:id', UserController.delUser);
route.post('/login', UserController.logIn);

module.exports = route;
