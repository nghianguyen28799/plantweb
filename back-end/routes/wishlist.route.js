const express = require('express')
const wishlists = express.Router()
const Wishlist = require("../models/wishlist.model");

const controller = require('../controllers/wishlist.controller');

wishlists.get('/show/userid=:id', controller.showByUserID)

wishlists.post('/create', controller.create)

wishlists.post('/finddata', controller.findData)

wishlists.post('/delete', controller.delete)


module.exports = wishlists;