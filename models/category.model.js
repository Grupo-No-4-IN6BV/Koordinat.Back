'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var userSchema = Schema ({
    name: String,
    conunt: Number,
    image: String,
})

module.exports = mongoose.model('category', userSchema)