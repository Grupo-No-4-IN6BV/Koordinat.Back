'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = Schema({
    name: String,
    email: String,
    description: String,
    address: [{
        lat: Number,
        lng: Number
    }],
    phone: String,
    image: String,
    password: String,
    role: String,

    products:[{type: Schema.ObjectId, ref:'product'}]
})

module.exports = mongoose.model('business', businessSchema);