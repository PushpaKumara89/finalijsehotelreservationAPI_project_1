const express = require('express');
const fsController = require('../controller/fsController');

const route = express.Router();

route.delete('/',fsController.deleteImage);

module.exports = route;
