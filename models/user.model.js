'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var userSchema = Schema ({
    name: String,
    lastname: String,
    phone: String,
    password: String,
    email: String,
    role: String,
    image: String,
    dateage: String,
    //<<ubicacion>>
    lat: Number,
    lng: Number,
    //-------------
    wishList: [{type: Schema.ObjectId, ref: "product"}],
    cartShopping: [{type: Schema.ObjectId, ref: "cart"}],
    categories: [{type: Schema.ObjectId, ref: "category"}],
    invoices: [{type: Schema.ObjectId, ref:'invoice'}]
})

module.exports = mongoose.model('user', userSchema)