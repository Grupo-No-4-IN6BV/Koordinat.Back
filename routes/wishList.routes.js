'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var wishController = require('../controllers/wishList.controller');

api.put('/:idU/:idP/wishSet', mdAuth.ensureAuth, wishController.wishSet);
api.put('/:idU/:idP/removeWish', mdAuth.ensureAuth , wishController.removeWish);

module.exports = api;