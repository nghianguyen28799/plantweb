const express = require('express')
const wishlists = express.Router()
const Wishlist = require("../models/wishlist.model");
var md5 = require('md5');

wishlists.get('/show/userid=:id', (req, res) => {
    const userId = req.params.id
    Wishlist.find({userId: userId})
    .then(data => {
        res.json(data);
    })
})

wishlists.post('/create', (req, res) => {
    Wishlist.create({
        userId: req.body.userId,
        productId: req.body.productId,
        size: req.body.size
    }).then(() => {
        res.send(200);
    })
})

wishlists.post('/finddata', (req, res) => {
    Wishlist.find({
        productId: req.body.productId,
        userId: req.body.userId,
        size: req.body.size
    }).then((data) => {
        (data.length != 0) ? res.json({added: true}) : res.json({added: false})
    })
})

wishlists.post('/delete', (req, res) => {
    const id = req.body.id
    Wishlist.deleteOne({_id: id})
    .then(() => {
        res.json({deleted: true})
    })
})


module.exports = wishlists;