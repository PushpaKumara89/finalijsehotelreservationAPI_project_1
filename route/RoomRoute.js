const express = require('express');
const RoomController = require('../controller/RoomController');

const route = express.Router();
route.post('/addRoom', RoomController.addRoom);
route.put('/updateRoom', RoomController.updateRoom);
route.delete('/deleteRoom', RoomController.deleteRoom);
route.get('/searchRoom', RoomController.searchRoom);
route.get('/getAllRoom', RoomController.getAllRoom);

module.exports = route;

