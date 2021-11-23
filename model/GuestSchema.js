const mongoose = require('mongoose');
const GustSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 45
    },
    contact_number: {
        type: String,
        required: true,
        maxlength: 15
    },
    address: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('guest', GustSchema);
