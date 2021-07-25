'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var categoryController = require('../controllers/category.controller');

api.put('/saveCategory', categoryController.saveCategory);
api.post('/searchCategory', categoryController.searchCategory);
api.put('/:idU/updateCategory/:idC', categoryController.updateCategory);
api.put('/:idU/removeCategory/:idC', categoryController.removeCategory);
api.get('/getCategories', categoryController.getCategories)


module.exports = api;