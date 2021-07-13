'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = Schema({
    name: String,
    email: String,
    description: String,
    address: String,
    phone: String,
    image: String,

    products:[{type: Schema.ObjectId, ref:'product'}]
})

module.exports = mongoose.model('business', businessSchema);