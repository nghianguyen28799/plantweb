var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    userId: String,
    productId: String,
    nameProduct: String,
    image: String,
    price: Number,
    size: String,
    number: Number,
});

var Cart = mongoose.model('Cart', cartSchema, 'cart');

module.exports = Cart