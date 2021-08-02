'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/auth');
var businessController = require('../controllers/business.controller');
const { bulkWrite } = require('../models/invoice.model');

api.post('/saveBusiness', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], businessController.saveBusiness);
api.put('/getBusiness/:idB', [mdAuth.ensureAuth], businessController.getBusiness);
api.get('/getInterprises',businessController.getInterprises)
api.post('/searchBusiness', businessController.searchBusiness);
api.put('/:idU/updateBusiness/:idB', businessController.updateBusiness);
api.put('/:idU/removeLeague/:idB', businessController.removeBusiness);
api.post('/registerBusiness', businessController.registerBusiness);
api.get('/notification/:idB', businessController.getNotification)

module.exports = api;