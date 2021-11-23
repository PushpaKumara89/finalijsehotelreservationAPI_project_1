const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    guest: {
        type: Object
    },
    room: {
        type: Object
    },
    cost: {
        type: Number
    },

});
module.exports = mongoose.model('booking', BookingSchema);
