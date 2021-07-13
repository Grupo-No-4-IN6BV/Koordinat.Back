'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var userController = require('../controllers/user.controller');


api.post('/saveUser', userController.saveUser);
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers);
api.put('/updateUser/:id', mdAuth.ensureAuth, userController.updateUser);
api.put('/removeUser/:id', mdAuth.ensureAuth, userController.removeUser);

module.exports = api;