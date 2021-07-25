'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingCartSchema = Schema({
    idProducto: String,
    producto: String,
    cantidad: Number,
    subtotal: Number
})
//Models
module.exports = mongoose.model('cart', shoppingCartSchema);