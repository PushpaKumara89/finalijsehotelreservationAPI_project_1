const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser')

//import route
const RoomRoute=require('./route/RoomRoute');


const PORT = process.env.SERVER_PORT;


const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost:27017/Marina').then(()=>{
    app.listen(PORT,()=>{
        console.log(`api up and running ${PORT}`);
    });
}).catch(error=>{
    console.log(error);
});

app.use('/api/v1/room',RoomRoute);
/*http://localhost:3000//api/v1/room*/

