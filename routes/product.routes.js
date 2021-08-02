'use strict'

var express = require('express');
var productController = require('../controllers/product.controller');
var mdAuth = require('../middlewares/auth');

var api = express.Router();

api.post('/saveProduct/:idB', mdAuth.ensureAuth , productController.saveProduct);
api.put('/updateProduct/:id', mdAuth.ensureAuth ,productController.updateProduct);
api.put('/controlStock', mdAuth.ensureAuth , productController.controlStock);
api.put('/removeProduct/:id', mdAuth.ensureAuth, productController.removeProduct);
api.get('/getProducts',  productController.getProducts);
api.get('/getProductNews', productController.getProductNews)
api.get('/getProduct/:id', productController.getProduct)
api.get('/spentProducts/:idB', mdAuth.ensureAuth, productController.spentProducts);
api.post('/searchProduct', mdAuth.ensureAuth, productController.searchProduct);
api.get('/orders/:idB', mdAuth.ensureAuth, productController.orders);
api.put('/delOrder', mdAuth.ensureAuth, productController.delOrder)

module.exports = api;