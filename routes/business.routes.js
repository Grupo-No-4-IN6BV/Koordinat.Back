'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var businessController = require('../controllers/business.controller');

api.put('/saveBusiness', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], businessController.saveBusiness);
api.put('/getBusiness/:idB', mdAuth.ensureAuth, businessController.getBusiness);
api.get('/getInterprises', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],businessController.getInterprises)
api.post('/searchBusiness', mdAuth.ensureAuth, businessController.searchBusiness);
api.put('/:idU/updateBusiness/:idB', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], businessController.updateBusiness);
api.put('/:idU/removeLeague/:idB', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], businessController.removeBusiness);


module.exports = api;