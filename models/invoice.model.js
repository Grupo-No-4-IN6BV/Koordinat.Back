'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = Schema({
    nameUser: String,
    date: String,
    details: []
})

module.exports = mongoose.model('invoice', invoiceSchema);