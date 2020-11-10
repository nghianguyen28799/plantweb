var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    address: Array, 
    facebookId: String,
    googleId: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User