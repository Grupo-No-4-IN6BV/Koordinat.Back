'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var wishController = require('../controllers/wishList.controller');

api.post('/:idU/:idP/addWish', wishController.addWish);
api.put('/:idU/:idP/wishSet', wishController.wishSet);
api.put('/:idU/:idP/removeWish', wishController.removeWish);

module.exports = api;