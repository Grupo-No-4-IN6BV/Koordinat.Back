'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingCartSchema = Schema({
    idUsuario: String,
    idProducto: String,
    idBusinnes: String,
    image: String,
    producto: String,
    cantidad: Number,
    subtotal: Number,
    condition: false,
    lat: Number,
    lng: Number
})
//Models
module.exports = mongoose.model('cart', shoppingCartSchema);