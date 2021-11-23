const express = require('express');
const GuestController = require('../controller/GuestController');

const route = express.Router();

route.post('/register', GuestController.Register);
route.get('/signIn', GuestController.SignIn);
route.get('/getGuest', GuestController.getOne);

module.exports = route;
