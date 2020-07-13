const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    mail: String,
    password: String,
    data: [{
        item: String,
        checked: Boolean
    }]
});

module.exports = mongoose.model('User', userSchema);