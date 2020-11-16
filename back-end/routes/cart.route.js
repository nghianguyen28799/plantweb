const express = require('express')
const cart = express.Router()

const controller = require('../controllers/cart.controller')

cart.post('/addCart', controller.addCart)

cart.get('/showCart/id=:id', controller.showCartByUserId);

cart.post('/product/update', controller.updateProductInCart);

cart.post('/product/delete', controller.deleteProductInCart);

module.exports = cart;