const express = require('express');
const BookingController = require('../controller/BookingControlle');

const route = express.Router();

route.post('/checkin',BookingController.checkInRoom);
route.get('/bookingCancel', BookingController.bookingCancel);
route.get('/getAllBookings', BookingController.getAllBookings);
route.get('/getA_bookings', BookingController.getA_booking);
route.get('/getCart', BookingController.getCart);

module.exports = route;
