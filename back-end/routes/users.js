const express = require('express')
const users = express.Router()
var md5 = require('md5');
const User = require("../models/user.model");

users.get('/id=:id', (req, res) => {
    const id = req.params.id;
    User.findOne({_id: id})
    .then((user) => {
        res.json(user);
    })
    .catch(err => {
        console.log('err: ' + err);
    })
}) 

users.get('/', (req, res) => {
    User.find()
    .then(data => {
        res.json(data);
    })
})

users.post('/deleteaddress', (req, res) => {
    const id = req.body.id;
    const getAddress = req.body.address;
    console.log(getAddress);
    User.findOne({_id: id})
    .then((user) => {
        let newAddress = [];
        for(let i in user.address) {
            if(user.address[i] != getAddress) {
                newAddress.push(user.address[i]);
            }
        }
        const condition = { _id: id }
        const update = { address: newAddress }
        User.updateOne(condition, update)
        .then(() => {
            res.json({updated: true})
        })
    })
    
}) 

users.post('/add-address', (req, res) => {
    const address = req.body.address;
    const id = req.body.id;
    User.findOne({_id: id})
    .then((user) => {
        let newAddress = [];
        for(let i in user.address) {
            newAddress.push(user.address[i]);
        }
        newAddress.push(address);
        const condition = { _id: id }
        const update = { address: newAddress }
        User.updateOne(condition, update)
        .then(() => {
            res.json({added: true})
        })
    })
})

users.post('/email_exist', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            res.json({exist: true})
            res.json({error: 'This email existed.'})
        } else {
            res.json({exist: false})
        }
    })
})

// Đăng ký đăng nhập

users.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            res.json({error: 'email existed'});
        } else if(req.body.email == "") {
            res.json({error: "err email"});
        }
        else {
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                valid: true,
            }
            res.json(userData);
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: md5('plantshop'+md5(req.body.password)),
                phone: req.body.phone,
                facebookId: '',
                googleId: ''
            })
        }
    })
    .catch(err => {
        console.log("err: ", err);
    })
})


users.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            if(req.body.password === user.password) {
                const payload = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    valid: true
                }
                res.json(payload);
            } else {
                res.json({error_password: "wrong password"});
            }
        } else {
            res.json({error_email: "user not exist"});
        }
    })
    .catch(err => {
        console.log('error: '+ err)
    })
})


// Update

users.post('/update/userinfor', (req, res) => {
    
    const condition = {_id: req.body.id};
    const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
    }
    User.updateOne(condition, update)
    .then(() => {
        res.send(200);
    })
})

users.post('/update/password', (req, res) => {
    const condition = {_id: req.body.id};
    const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: md5('plantshop'+md5(req.body.newPassword))
    }
    console.log(update);
    User.updateOne(condition, update)
    .then(() => {
        res.send(200);
    })
})

users.post('/update/addtowishlist', (req, res) => {
    const id = req.body.id;
    const condition = {_id: id};
    const update = {
        wishList: id
    }
    User.updateOne(condition, update)
    .then(() => {
        console.log('thanh cong');
    })
    
})


// Facebook

users.post('/login/facebook', (req, res) => {
    User.find({facebookId: req.body.id})
    .then(user => {    
        res.json(user);
    })
})


users.post('/facebook_exist', (req, res) => {
    User.findOne({
        facebookId: req.body.facebookId
    })
    .then(user => {
        if(user) {
            res.json({exist: true})
        } else {
            res.json({exist: false})
        }
    })
})

users.post('/register/facebook', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: '',
        email: '',
        password: '',
        phone: '',
        facebookId: req.body.idFacebook,
        googleId: ''
    })
    .then(fbID => {
        if(fbID) {
            res.json({success: true});
        }
    })
})

// Google

users.post('/login/google', (req, res) => {
    User.find({googleId: req.body.id})
    .then(user => {    
        res.json(user);
    })
})


users.post('/google_exist', (req, res) => {
    User.findOne({
        googleId: req.body.googleId
    })
    .then(user => {
        if(user) {
            res.json({exist: true})
        } else {
            res.json({exist: false})
        }
    })
})

users.post('/register/google', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: '',
        email: '',
        password: '',
        phone: '',
        facebookId: '',
        googleId: req.body.idGoogle,
    })
    .then(ggID => {
        if(ggID) {
            res.json({success: true});
        }
    })
})

module.exports = users;