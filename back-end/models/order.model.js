var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    userId: String,
    userName: String,
    userPhone: String,
    userAddress: String,
    productId: Array,
    productName: Array,
    productPrice: Array,
    productImage: Array,
    productSize: Array,
    numberOfEachProduct: Array,
    shippingFee: Number,
    productPriceTotal: Number,
    shippingTime: String,
    currentTime: Date,
    orderStatus: Number
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;