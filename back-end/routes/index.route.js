const express = require('express')
const app = express();

const ProductsRoute = require('./products.route')
const UsersRoute = require('./users.route');
const CartRoute = require('./cart.route');
const OrderRoute = require('./order.route')
const WishlistRoute = require('./wishlist.route'); 
const ChatRoute = require('./chat.route'); 
const VoucherRoute = require('./voucher.route');

module.exports = { ProductsRoute, UsersRoute, CartRoute, OrderRoute, WishlistRoute, ChatRoute, VoucherRoute }