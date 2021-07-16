'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    solds: Number,

    category: [{type: Schema.ObjectId, ref:'category'}] 
})

module.exports = mongoose.model('product', productSchema);