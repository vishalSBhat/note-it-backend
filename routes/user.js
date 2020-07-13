const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.get('/list/:token', (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'simplesecretkey', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('An error occurred');
        }
        user.findOne({
            mail: data.mail
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.send("There was an error logging in");
            }
            if (!foundUser)
                return res.json({
                    authentication: "false"
                });
            res.json({
                list: foundUser.data
            });
        });
    });
});

router.post('/add-item/:token', (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'simplesecretkey', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('An error occurred');
        }
        user.findOne({
            mail: data.mail
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.send("There was an error logging in");
            }
            if (!foundUser)
                return res.json({
                    authentication: "false"
                });
            foundUser.data.unshift({
                item: req.body.item,
                checked: false
            });
            foundUser.save((err, data) => {
                res.json({
                    list: [...data.data]
                });
            });
        });
    });
})

router.post('/item-status/:token', (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'simplesecretkey', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('An error occurred');
        }
        user.findOne({
            mail: data.mail
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.send("There was an error logging in");
            }
            if (!foundUser)
                return res.json({
                    authentication: "false"
                });
            const updatedUser = foundUser.data.map(item => {
                if (item._id.equals(req.body.id))
                    item.checked = !item.checked;
                return item;
            });
            foundUser.data = [...updatedUser];
            foundUser.save();
            res.json({
                list: [...updatedUser]
            });
        });
    });
});

router.post('/delete-item/:token', (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'simplesecretkey', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('An error occurred');
        }
        user.findOne({
            mail: data.mail
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.send("There was an error logging in");
            }
            if (!foundUser)
                return res.json({
                    authentication: "false"
                });
            const updatedUser = foundUser.data.filter(item => !(item._id.equals(req.body.id)));
            foundUser.data = [...updatedUser];
            foundUser.save();
            res.json({
                list: [...updatedUser]
            });
        });
    });
});

router.post('/edit-item/:token', (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'simplesecretkey', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('An error occurred');
        }
        user.findOne({
            mail: data.mail
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.send("There was an error logging in");
            }
            if (!foundUser)
                return res.json({
                    authentication: "false"
                });
            let updatedUser = [...foundUser.data];
            updatedUser.map(item => {
                if (item._id.equals(req.body.id))
                    item.item = req.body.name;
                return item;
            });
            foundUser.data = [...updatedUser];
            foundUser.save();
            res.json({
                list: [...updatedUser]
            });
        });
    });
})

module.exports = router;