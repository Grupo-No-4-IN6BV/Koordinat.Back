'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var cartController = require('../controllers/shoppingCart.controller');

api.post('/shopping/:id', mdAuth.ensureAuth ,cartController.shopping);
api.post('/:idU/removeItem/:idI', mdAuth.ensureAuth ,cartController.removeItem);
api.put('/:idU/:idC/updateCantidad', mdAuth.ensureAuth ,cartController.updateCantidad);
module.exports = api;