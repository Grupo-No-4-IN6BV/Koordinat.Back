'use strict'

var express = require('express');
var productController = require('../controllers/product.controller');
var mdAuth = require('../middlewares/auth');

var api = express.Router();

api.post('/saveProduct/:idB', mdAuth.ensureAuth, productController.saveProduct);
api.put('/updateProduct/:id', mdAuth.ensureAuth, productController.updateProduct);
api.put('/controlStock', mdAuth.ensureAuth, productController.controlStock);
api.delete('/removeProduct/:id', mdAuth.ensureAuth, productController.removeProduct);
api.get('/getProducts', mdAuth.ensureAuth, productController.getProducts);
api.get('/getProduct/:id', mdAuth.ensureAuth, productController.getProduct)
api.get('/spentProducts', mdAuth.ensureAuth, productController.spentProducts);
api.post('/searchProduct', mdAuth.ensureAuth, productController.searchProduct);

module.exports = api;