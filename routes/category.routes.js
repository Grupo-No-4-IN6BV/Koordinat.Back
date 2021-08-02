'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var categoryController = require('../controllers/category.controller');

api.put('/saveCategory', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin] ,categoryController.saveCategory);
api.post('/searchCategory', categoryController.searchCategory);
api.put('/updateCategory/:idC', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin] ,categoryController.updateCategory);
api.put('/removeCategory/:idC', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin] ,categoryController.removeCategory);
api.get('/getCategories', categoryController.getCategories)


module.exports = api;