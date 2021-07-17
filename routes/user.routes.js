'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var userController = require('../controllers/user.controller');

api.post('/login', userController.login);
api.post('/saveUser', userController.saveUser);
api.get('/getUsers', userController.getUsers);
api.put('/updateUser/:id', userController.updateUser);
api.put('/removeUser/:id', userController.removeUser);
api.post('/registerUser', userController.registerUser);

module.exports = api;