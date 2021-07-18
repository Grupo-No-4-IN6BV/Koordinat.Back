'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var wishSchema = Schema ({
    productos: [{type: Schema.ObjectId, ref: "product"}]
})

module.exports = mongoose.model('wish', wishSchema)