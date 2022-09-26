const Room = require('../model/RoomSchema');

const addRoom = (req, resp) => {
    const temRoom = new Room({
        room_number: req.body.room_number,
        room_category: req.body.room_category,
        price_per_night: req.body.price_per_night,
        description: req.body.description,
        image:{status:false,image:['assets/imgno.jpg']}//image not uploaded

    });
    Room.findOne({room_number: req.body.room_number}).then(response => {
        if (response === null) {
            temRoom.save().then(response => {
                resp.status(201).json({status: true, massage: 'Saved..'});
            }).catch(error => {
                resp.status(500).json({status: false, massage: 'Try Again..'});
            })
        } else {
            resp.status(400).json({state: false, message: 'Already Exists..'});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again..'});
    })
}

const deleteRoom = (req, resp) => {
    Room.deleteOne({room_number: req.headers.room_number}).then(response => {
        if (response.deletedCount > 0) {
            resp.status(201).json({status: true, massage: 'Deleted..'});
        } else {
            resp.status(400).json({status: true, massage: 'Try Again..'});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })
}

const updateRoom = (req, resp) => {
    Room.updateOne({room_number: req.body.room_number}, {
        $set: {
            room_category: req.body.room_category,
            price_per_night: req.body.price_per_night,
            description: req.body.description
        }
    }).then(response => {
        if (response.modifiedCount > 0) {
            resp.status(201).json({status: true, massage: 'Update..'});
        } else {
            resp.status(400).json({status: true, massage: 'Try Again..'});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })
}

const imageUpload = (req, resp) => {
    if(req.body.image=== undefined){
        return;
    }
    Room.updateOne({room_number: req.body.room_number}, {
        $set: {
            image: {status:true,image:req.body.image}

        }
    }).then(response => {
        if (response.modifiedCount > 0) {
            resp.status(201).json({status: true, massage: 'Save Success..'});
        } else {
            resp.status(400).json({status: true, massage: 'Try Again..'});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })
}

const searchRoom = (req, resp) => {
    Room.findOne({room_number: req.headers.room_number}).then(response => {
        if(response === null){
            resp.status(400).json({status: false, massage: 'Empty Result'});
        }else {
            resp.status(201).json({status: true, data: response});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again..'});
    })
}

const getAllRoom = (req, resp) => {
    Room.find().then(response => {
        if (response === null) {
            resp.status(400).json({status: false, massage: 'Empty Result'});
        } else {
            resp.status(201).json({status: true, data: response});
        }
    }).catch(error => {
        resp.status(500).json({status: false, massage: 'Try Again..'});
    })

}

module.exports = {addRoom, updateRoom, deleteRoom, searchRoom, getAllRoom, imageUpload};
