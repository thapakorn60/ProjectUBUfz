const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const timestamp = require('mongoose-timestamp');

const User = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    tel: String,
    age: String,
    sex: String,
    lifestyle: Object,
    educational: String,
    faculty: String,
    year: String,
    facebook: String,
    instagram: String,
    other: String,
    img: String,
}, { timestamp: true });
module.exports = mongoose.model('User', User);

module.exports.getUserById = (id, callback) => {
    Users.findById(id, callback);
}

module.exports.getUserByUsername = (email, callback) => {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}