const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true
    },
    room_category: {
        type: String,
        required: true
    },
    price_per_night: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type:Object
    }

});
module.exports = mongoose.model('room', RoomSchema);
