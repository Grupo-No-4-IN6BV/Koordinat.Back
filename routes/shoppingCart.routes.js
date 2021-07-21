'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var cartController = require('../controllers/shoppingCart.controller');

//api.post('/agregarItem/:idP', mdAuth.ensureAuth ,cartController.agregarItem);
//api.post('/saveCart/:idU/:idP', cartController.saveCart);
api.post('/item/:idU', cartController.item);
//api.post('/:idU/:idP/add2', cartController.add2);

module.exports = api;