var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishlistSchema = new Schema({
        userId: String,
        productId: String,
        size: String
});

var Wishlist = mongoose.model('Wishlist', wishlistSchema, 'wishlist');

module.exports = Wishlist