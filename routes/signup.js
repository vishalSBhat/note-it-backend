const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/', (req, res) => {
    const {
        name,
        mail,
        password
    } = req.body;
    user.findOne({
        mail
    }, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.json({
                message: "There was an error adding user",
                token: "null"
            });
        }
        if (foundUser)
            return res.json({
                message: 'User already exists with name ' + foundUser.name,
                token: "null"
            });

        const newUser = new user({
            name,
            mail,
            password,
            data: []
        });
        newUser.save();
        jwt.sign({
            mail
        }, 'simplesecretkey', (err, jwtToken) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                token: jwtToken
            });
        });
    });
})

module.exports = router;