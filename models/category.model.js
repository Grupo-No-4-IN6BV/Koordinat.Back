'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var categorySchema = Schema ({
    name: String,
    description: String, 
    count: Number,
    image: String,
})

module.exports = mongoose.model('category', categorySchema)