'use strict'

var express = require('express');
var invoiceController = require('../controllers/invoice.controller');
var mdAuth = require('../middlewares/auth');

var api = express.Router();

api.post('/:idU/checkIn', mdAuth.ensureAuth, invoiceController.CheckIn);
api.get('/getInvoices/:idU', mdAuth.ensureAuth, invoiceController.getInvoices);
api.get('/getInvoice/:id', mdAuth.ensureAuth, invoiceController.getInvoice);

module.exports = api;