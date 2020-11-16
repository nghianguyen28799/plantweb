const express = require('express')
const product = express.Router();

const Product = require('../models/product.model');
const controller = require('../controllers/product.controller');

product.get('/', controller.index)

product.get('/type=:type', controller.type)

product.get('/id=:id', controller.id)

product.get('/type=:type/page=:page', controller.paginationType)

product.get('/search=:keyword', controller.search)

product.get('/search=:keyword/page=:page', controller.paginationSearch)

product.get('/search=:keyword/sort=increase/page=:page', controller.sortIncreaseOfPaginationSearch)

product.get('/search=:keyword/sort=decrease/page=:page', controller.sortDecreaseOfPaginationSearch)

product.get('/type=:type/sort=increase/page=:page', controller.typeIncreaseOfPagination)

product.get('/type=:type/sort=decrease/page=:page', controller.typeDecreaseOfPagination)

product.post('/similarproducts', controller.similarProducts)


module.exports = product;