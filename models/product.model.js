'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    solds: Number,

    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,

    category: {type: Schema.ObjectId, ref:'category'},
    business: {type: Schema.ObjectId, ref:'business'}
})

module.exports = mongoose.model('product', productSchema);