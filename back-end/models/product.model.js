var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    prices: Array,
    sizes: Array,
    images: Array,
    type: String,
    description: String,
    number: Number
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product