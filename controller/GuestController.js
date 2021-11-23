const bcrypt = require('bcrypt');
const saltRounds = 10;


const Guest = require('../model/GuestSchema');
const jwt = require('jsonwebtoken');


const Register = (req, resp) => {
    console.log(req)
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const guest = new Guest({
            name: req.body.name,
            contact_number: req.body.contact_number,
            address: req.body.address,
            email: req.body.email,
            password: hash

        });
        Guest.findOne({email: req.body.email}).then(rst => {
            if (rst === null) {
                guest.save().then(response => {
                    const token = jwt.sign(
                        {email: req.body.email, password: req.body.password},
                        process.env.JWT_ACCESS_KEY,
                        {expiresIn: '1h'}
                    );

                    resp.status(201).json({
                        status: true,
                        guest: {name: req.body.name, token: token, email: req.body.email}
                    });
                }).catch(error => {
                    resp.status(500).json({status: false, massage: 'Try Again..'});
                })
            } else {
                resp.status(400).json({state: false, message: 'Already Exists..'});
            }
        }).catch(error => {
            resp.status(500).json({status: false, massage: 'Try Again..'});
        })
    });
}

const SignIn = (req, resp) => {
    Guest.findOne({email: req.headers.email}).then(response => {
        if (response !== null) {
            bcrypt.compare(req.headers.password, response.password, function (err, result) {
                // result == true
                if (result) {
                    const token = jwt.sign(
                        {email: response.email, password: req.headers.password},
                        process.env.JWT_ACCESS_KEY,
                        {expiresIn: '1h'}
                    );
                    resp.status(201).json({
                        status: true,
                        guest: {name: response.name, token: token, email: req.headers.email}
                    });
                } else {
                    resp.status(401).json({massage: 'Un Authorized Request..'});
                }
            });
        } else {
            resp.status(404).json({massage: 'User Not Founded..'});
        }
    });
}

const getOne = (req, resp) => {
    console.log(req.headers)
    Guest.findOne({email: req.headers.email}).then(response => {
        if (response === null) {
            resp.status(400).json({state: false, message: 'Empty Result..'});
        } else {
            resp.status(200).json({state: true, data: response});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again..'});
    })

}




module.exports = {Register, SignIn, getOne};
