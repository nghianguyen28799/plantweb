var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    userId: String,
    userInfo: Array,
    productInfo: Array,
    shippingFee: Number,
    voucher: Number,
    total: Number,
    shippingTime: String,
    currentTime: String,
    orderStatus: Number
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;