'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingCartSchema = Schema({
    idProducto: Number,
    producto: String,
    cantidad: Number,
    subtotal: Number,
    total: Number
})

module.exports = mongoose.model('cart', shoppingCartSchema);