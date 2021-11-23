const bcrypt = require('bcrypt');
const saltRounds = 10;


const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken');


const signUp = (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        new User({
            user_name: req.body.user_name,
            contact: req.body.contact,
            email: req.body.email,
            password: hash,
            avatar:req.body.avatar

        }).save().then(response => {
            const token = jwt.sign(
                {email: req.body.email, password: req.body.password},
                process.env.JWT_ACCESS_KEY,
                {expiresIn: '1h'}
            );

            resp.status(201).json({
                status: true,
                admin_token: {token: token,avatar:req.body.avatar, user_name: req.body.user_name, email: req.body.email}
            });
        }).catch(error => {
            resp.status(500).json({status: false, massage: 'Try Again..'});
        })
    });

}

const login = (req, resp) => {

    User.findOne({email: req.headers.email}).then(response => {
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
                        admin_token: {token: token, user_name: response.user_name, email: response.email,avatar:response.avatar}
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

module.exports = {signUp, login};
