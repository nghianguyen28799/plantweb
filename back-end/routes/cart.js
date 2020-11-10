const express = require('express')
const cart = express.Router()

const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

cart.post('/addCart', (req, res) => {
    Cart.findOne({
        userId: req.body.userId,
        productId: req.body.productId,
        size: req.body.size
    })
    .then(cart => {
        if(!cart) {
            const product = {
                userId: req.body.userId,
                nameProduct: req.body.nameProduct,
                image: req.body.image,
                price: req.body.price,
                size: req.body.size,
                number: req.body.number,
                checkAdd: true
            }
            res.json(product);
            Cart.create({
                userId: req.body.userId,
                productId: req.body.productId,
                nameProduct: req.body.nameProduct,
                image: req.body.image,
                price: req.body.price,
                size: req.body.size,
                number: req.body.number,
            })
        }
        else {
            const num = req.body.number;
            const Number = cart.number;
            const conditions = {
                userId: req.body.userId,
                productId: req.body.productId
            }
            const update = {number: Number + num}
            
            Cart.updateOne(conditions, update)
            .then(ok => {
                res.json('ok');
            })
        }
    })
    .catch(err => {
        console.log("err: ", err);
    })
})

cart.get('/showCart/id=:id', (req, res) => {
    const userId = req.params.id;
    Cart.find({userId: userId}) 
    .then(myCart => {
        if(myCart) {
            myCart.map((data) => {
                Product.findOne({_id: data.productId})
                .then(product => {          
                    if(data.number > product.number) {
                        const conditions = {_id: data._id}
                        const update = {number: product.number}
                        Cart.updateOne(conditions, update).then(res => {

                        })
                    }
                })
            })
        }
    })
    Cart.find({userId: userId})
    .then(dataCart => {
        res.json(dataCart);
    })
});


cart.post('/product/update', (req, res) => {
    const productid = req.body.idProduct;
    const userid = req.body.idUser;
    const num = req.body.number;
    Cart.findOne({
        userId: userid,
        productId: productid
    })
    .then(product => {
        if(product) {
            const Number = product.number;
            const conditions = {
                userId: userid,
                productId: productid
            }
            const update = {number: Number + num}
            Cart.updateOne(conditions, update). then(res => {
                
            })
        }
        res.send(200)
    })
    .catch(err => {
        res.json('err: ' + err);
    })
})


cart.post('/product/delete', (req, res) => {
    const productid = req.body.idProduct;
    const userid = req.body.idUser;
    Cart.findOne({
        userId: userid,
        productId: productid
    })
    .then(product => {
        if(product) {
            const Number = product.number;
            const conditions = {
                userId: userid,
                productId: productid
            }            
            Cart.deleteOne(conditions, err => {
                if(err) return handleError(err);
            })
            res.send(200);
        }
    })
    .catch(err => {
        res.json('err: ' + err);
    })
})

module.exports = cart;