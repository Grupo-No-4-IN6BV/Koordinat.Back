'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var cartController = require('../controllers/shoppingCart.controller');

api.post('/shopping/:id', cartController.shopping);
api.post('/:idU/removeItem/:idI', cartController.removeItem);
api.put('/:idU/:idC/updateCantidad', cartController.updateCantidad);
module.exports = api;