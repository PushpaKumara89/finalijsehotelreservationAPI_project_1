const express = require('express');
const UsrController = require('../controller/UserController');

const route = express.Router();

route.post('/singUp', UsrController.signUp);
route.get('/login', UsrController.login);

module.exports = route;
