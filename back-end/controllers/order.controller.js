const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports = {
    createOrder: (req, res) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const currentTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        Order.create({
            userId: req.body.userId,
            userName: req.body.userName,
            userPhone: req.body.userPhone,
            userAddress: req.body.userAddress,
            productId: req.body.productId,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productImage: req.body.productImage,
            productSize: req.body.productSize,
            numberOfEachProduct: req.body.numberOfEachProduct,
            shippingFee: req.body.shippingFee,
            productPriceTotal: req.body.productPriceTotal,
            shippingTime: req.body.shippingTime,
            currentTime: currentTime,
            orderStatus: 0
        })
        .then(success => {
            if(success) {
                const userid = req.body.userId;
                Cart.find({
                    userId: userid
                })
                .then(cart => {
                    if(cart) {   
                        cart.map(product => {
                            Product.findOne({_id: product.productId})
                            .then(data => {
                                const conditionUpdate = {_id: product.productId}
                                const update = {number: data.number - product.number}
                                Product.updateOne(conditionUpdate, update).then(update => {
                                })
                            })
                        })
                        const Number = cart.number;
                        const conditions = {
                            userId: userid
                        }            
                        Cart.deleteMany(conditions, err => {
                            if(err) return handleError(err);
                        })
                    }
                })
                .catch(err => {
                    res.json('err: ' + err);
                })
                res.send(200);
            }
        })
    },

    orders: (req, res) => {
        Order.find()
        .then(data => {
            res.json(data);
        })
    },

    showOrderByUserId: (req, res) => {
        const id = req.params.id;
        Order.find({userId: id})
        .exec((err, data) => {
            if(err) {
                console.log('err: ', err);
            } else {
                res.json(data);
            }
        })
    },

    updateStatus: (req, res) => {
        const id = req.body.id;
        const newStatus = req.body.orderStatus;
        Order.find({_id: id}) 
        .then(order => {
            if(order) {
                const condition = {_id: id}
                const update = { orderStatus: newStatus }

                Order.updateOne(condition, update).then(() => {})
            }
        })    
    }
}