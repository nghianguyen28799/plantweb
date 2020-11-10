const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var mongoose = require('mongoose');

const port = 9000;
mongoose.connect("mongodb://localhost:27017/plantshop")
.then(() => console.log("mongoDB connected"))
.catch(err => console.log('err: ' + err))

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const limit = 16;


const ProductsRoute = require('./routes/products')
const UsersRoute = require('./routes/users');
const CartRoute = require('./routes/cart');
const OrderRoute = require('./routes/order')
const WishlistRoute = require('./routes/wishlist'); 
app.use('/product', ProductsRoute)
app.use('/users', UsersRoute);
app.use('/cart', CartRoute);
app.use('/order', OrderRoute);
app.use('/wishlist', WishlistRoute);
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
