const express = require('express');
const route = express.Router();

/* GET home page. */
route.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = route;
