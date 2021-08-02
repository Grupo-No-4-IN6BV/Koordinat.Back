'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var userController = require('../controllers/user.controller');

api.post('/login', userController.login);
api.post('/saveUser', userController.saveUser);
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin] ,userController.getUsers);
api.put('/updateUser/:id', mdAuth.ensureAuth ,userController.updateUser);
api.put('/removeUser/:id', mdAuth.ensureAuth ,userController.removeUser);
api.post('/registerUser', userController.registerUser);

module.exports = api;