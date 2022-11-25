const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');


//import route
const GuestRoute = require('./route/GuestRoute');
const UserRoute = require('./route/UserRoute');
const RoomRoute = require('./route/RoomRoute');
const imagRoute = require('./route/ImageRoute');
const BookingRoute = require('./route/BookingRoute');
const fs = require('./route/fsRoute')


const PORT = process.env.SERVER_PORT;


const app = express();


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.get('',(req,res,next)=>{
    res.json('hello world');
})

/*'mongodb://localhost:27017/marina'*///for node 16 below versions
/*'mongodb://0.0.0.0:27017/marina'*///for node 16 upto versions
mongoose.connect('mongodb://localhost:27017/marina').then(() => {
    app.listen(PORT, () => {
        console.log(`api  up and  running ${PORT}`);
    });
}).catch(error => {
    console.log(error);
});

//link export ....................
app.use('/api/v1/guest', GuestRoute);
app.use('/api/v1/user', UserRoute);
app.use('/images', express.static('upload/images'));
app.use('/api/v1/imageupload', imagRoute);
app.use('/api/v1/room', RoomRoute);
app.use('/api/v1/booking', BookingRoute);
app.use('/api/v1/fileDelete',fs);

/*http://localhost:3000/api/v1/room*/

