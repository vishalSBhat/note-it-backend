const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/', (req, res) => {
    const {
        mail,
        password
    } = req.body;
    user.findOne({
        mail
    }, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.json({
                message: "There was an error logging in",
                token: "null"
            });
        }
        if (!foundUser)
            return res.json({
                message: "User doesn't exist",
                token: "null"
            });

        if (foundUser.password !== password)
            return res.json({
                message: "e-Mail and password don't match'",
                token: "null"
            });
        jwt.sign({
            mail: foundUser.mail
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