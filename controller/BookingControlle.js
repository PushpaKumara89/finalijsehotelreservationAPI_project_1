const Booking = require('../model/BookingSchema');
const Room = require('../model/RoomSchema');
const Guest = require('../model/GuestSchema');

const checkInRoom = async (req, resp) => {
    const booking = new Booking({
        start_date:new Date(req.body.start_date),
        end_date:new Date(req.body.end_date),
        guest: {},
        room: {},
        cost: req.body.cost

    });


    Room.findOne({room_number: req.body.room_number}).then(room => {
        booking.room = room;


    }).then(Guest.findOne({email: req.body.email}).then(guest => {
            booking.guest = guest;


        }).then(() => {
            booking.save().then(response => {
                resp.status(201).json({state: true, message: 'saved..'});

            }).catch(error => {
                resp.status(500).json(error);
            })
        })
    );
}


const getAllBookings = (req, resp) => {
    Booking.find().then(response => {
        if (response === null) {
            resp.status(400).json({status: false, massage: 'Empty Result'});
        } else {
            resp.status(201).json({status: true, data: response});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })
}


const getA_booking = (req, resp) => {
    Booking.findOne({_id:req.headers._id}).then(response=>{
        if(response===null){
            resp.status(400).json({state: false, message: 'Empty Result..'});
        }else {
            resp.status(200).json({state: false, data: {
                _id:response._id,start_date:response.start_date,end_date:response.end_date,
                    guest:{name:response.guest.name,contact_number:response.guest.contact_number,address:response.guest.address,email:response.guest.email},
                    room:{room_number:response.room.room_number,room_category: response.room.room_category,price_per_night: response.room.price_per_night,description:response.room.description}
                }});
        }
    }).catch(error=>{
        resp.status(500).json({state: false, message: 'Try Again..'});
    })
}

const bookingCancel = (req, resp) => {
    Booking.deleteOne({_id: req.headers._id}).then(response => {
        if (response.deletedCount > 0) {
            resp.status(201).json({status: true, massage: 'Canceled..'});
        } else {
            resp.status(400).json({status: true, massage: 'Try Again..'});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })
}

const getCart = (req, resp) => {
    Booking.find().then(response => {
        if(response===null){
            resp.status(400).json({status: false, massage: 'Empty Result'});
        }else {
            let temp=[];
            let data =[];
            temp=response;
            for (let i = 0; i < temp.length; i++) {
                if(String(temp[i].guest.email)===String(req.headers.email)){
                    data.push(temp[i]);
                }

            }
            resp.status(201).json({status: true, data: data});
        }
    })
}

module.exports = {checkInRoom, bookingCancel, getAllBookings,getA_booking,getCart};
