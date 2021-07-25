'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var businessController = require('../controllers/business.controller');

api.post('/saveBusiness', businessController.saveBusiness);
api.put('/getBusiness/:idB', [mdAuth.ensureAuth], businessController.getBusiness);
api.get('/getInterprises',businessController.getInterprises)
api.post('/searchBusiness', businessController.searchBusiness);
api.put('/:idU/updateBusiness/:idB', businessController.updateBusiness);
api.put('/:idU/removeLeague/:idB', businessController.removeBusiness);
api.post('/registerBusiness', businessController.registerBusiness);

module.exports = api;