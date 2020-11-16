const express = require('express')
const order = express.Router()

const controller = require('../controllers/order.controller');

order.post('/createOrder', controller.createOrder)

order.get('/', controller.orders)

order.get('/showOrder/id=:id', controller.showOrderByUserId)

order.post('/update', controller.updateStatus)

module.exports = order;