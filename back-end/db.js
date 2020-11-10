const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/plantshop")
.then(() => console.log("mongoDB connected"))
.catch(err => console.log('err: ' + err))

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Product = require('./models/product.model');
const Cart = require('./models/cart.model');
const Order = require("./models/order.model");
const Wishlist = require("./models/wishlist.model");
const User = require("./models/user.model");

var md5 = require('md5');
const limit = 16;

module.exports = db;