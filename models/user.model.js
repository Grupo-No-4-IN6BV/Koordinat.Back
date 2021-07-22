'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var userSchema = Schema ({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    role: String,
    image: String,
    //<<ubicacion>>
    lat: Number,
    lng: Number,
    //-------------
    wishList: [{type: Schema.ObjectId, ref: "product"}],
    cartShopping: [{
        idProducto: Number,
        nombre: String,
        cantidad: Number,
        subtotal: Number,
        total: Number
        }],
    categories: [{type: Schema.ObjectId, ref: "category"}]
})

module.exports = mongoose.model('user', userSchema)