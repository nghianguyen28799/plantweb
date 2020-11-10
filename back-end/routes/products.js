const express = require('express')
const product = express.Router();

var Product = require('../models/product.model');

const limit = 16;

product.get('/', function (req, res) {
    Product.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log('err: ' + err);
    })
})

product.get('/type=:type', function (req, res) {
    const type = req.params.type

    Product.find({type : type})
    .exec( (err,data) => {
        if(err){
            console.log("errrr");
        }else{
            res.json(data);
        }
    })
})

product.get('/id=:id', function(req, res) {
    const id = req.params.id;
    Product.find({_id  : id})
    .exec( (err,data) => {
        if(err){
            console.log("errrr");
        }else{
            res.json(data);
        }
    })
})

product.get('/type=:type/page=:page', function (req, res) {
    const type = req.params.type;
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({type  : type}).skip(start).limit(limit)
    .exec( (err,data) => {
        if(err){
            console.log("errrr");
        }else{
            res.json(data);
        }
    })
})

product.get('/search=:keyword', function (req, res) {
    const keyword = req.params.keyword.toLowerCase();
    Product.find({name:{'$regex' : keyword, '$options' : 'i'}})
    .exec( (err,data) => {
        if(err){
            console.log("errrr");
        }else{
            res.json(data);
        }
    })
})

product.get('/search=:keyword/page=:page', function (req, res) {
    const keyword = req.params.keyword.toLowerCase();
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).skip(start).limit(limit)
    .exec( (err,data) => {
        if(err){
            console.log("errrr");
        }else{
            res.json(data);
        }
    })
})

product.get('/search=:keyword/sort=increase/page=:page', (req, res) => {
    const keyword = req.params.keyword.toLowerCase();
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).sort({prices: [1]}).skip(start).limit(limit)
    .exec((err, data) => {
        if(err) {
            console.log('err: ', err);
        } else {
            res.json(data);
        }
    })
})

product.get('/search=:keyword/sort=decrease/page=:page', (req, res) => {
    const keyword = req.params.keyword.toLowerCase();
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).sort({prices: [-1]}).skip(start).limit(limit)
    .exec((err, data) => {
        if(err) {
            console.log('err: ', err);
        } else {
            res.json(data);
        }
    })
})

product.get('/type=:type/sort=increase/page=:page', (req, res) => {
    const type = req.params.type;
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({type: type}).sort({prices: [1]}).skip(start).limit(limit)
    .exec((err, data) => {
        if(err) {
            console.log('err: ', err);
        } else {
            res.json(data);
        }
    })
})

product.get('/type=:type/sort=decrease/page=:page', (req, res) => {
    const type = req.params.type;
    const page = req.params.page;
    var start = limit * (page-1);
    Product.find({type: type}).sort({prices: [-1]}).skip(start).limit(limit)
    .exec((err, data) => {
        if(err) {
            console.log('err: ', err);
        } else {
            res.json(data);
        }
    })
})

product.post('/similarproducts', (req, res) => {
    const id = req.body.id;
    const arr = req.body.arr;
    const type = req.body.type;
    Product.find({type: type})
    .then(product => {
        let data = [];
        for(let i in arr) {
            data.push(product[arr[i]]);
        }
        res.json(data);
    })
})


module.exports = product;