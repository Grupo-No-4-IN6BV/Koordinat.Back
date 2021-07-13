'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var categoryController = require('../controllers/category.controller');

api.put('/saveCategory', mdAuth.ensureAuth, categoryController.saveCategory);
api.post('/searchCategory', mdAuth.ensureAuth, categoryController.searchCategory);
api.put('/:idU/updateCategory/:idC', mdAuth.ensureAuth, categoryController.updateCategory);
api.put('/:idU/removeCategory/:idC', mdAuth.ensureAuth, categoryController.removeCategory);


module.exports = api;