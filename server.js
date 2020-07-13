const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express(),
    port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://admin-V:q1w2e3r4@v-lytod.mongodb.net/toDoDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, err => err ? console.log(err) : console.log('Successfully connected to database'));

app.use(helmet());
app.use(cors());
app.use(express.json({
    extended: true
}));

const signup = require('./routes/signup');
const login = require('./routes/login');
const user = require('./routes/user');

app.use('/signup', signup);
app.use('/login', login);
app.use('/user', user);


app.listen(port, console.log('Server listening on port ' + port));