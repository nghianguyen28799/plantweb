const express = require('express')
const users = express.Router()

const User = require("../models/user.model");
const controller = require('../controllers/user.controller');
users.get('/id=:id', controller.id) 

users.get('/', controller.user)

users.post('/deleteaddress', controller.deleteAddress) 

users.post('/add-address', controller.addAddress)

users.post('/email_exist', controller.emailExist)

// Đăng ký đăng nhập

users.post('/register', controller.register)

users.post('/login', controller.login)


// Update

users.post('/update/userinfor', controller.userInfor)

users.post('/update/password', controller.updatePassword)

users.post('/update/addtowishlist', controller.addWishlist)


// Facebook

users.post('/login/facebook', controller.facebookLogin)

users.post('/facebook_exist', controller.facebookExist)

users.post('/register/facebook', controller.facebookRegister);

// Google

users.post('/login/google', controller.googleLogin);

users.post('/google_exist', controller.googleExist)

users.post('/register/google', controller.googleRegister)

module.exports = users;