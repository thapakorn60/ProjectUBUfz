var mongoose = require('mongoose');
var UserLogin = mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
})

var LoginModel = mongoose.model('Users', UserLogin);
module.exports = LoginModel;