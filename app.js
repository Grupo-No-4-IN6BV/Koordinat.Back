'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var businessRoutes = require('./routes/business.routes');
var userRoutes = require('./routes/user.routes');
var categoryRoutes = require('./routes/category.routes');
var productRoutes = require ('./routes/product.routes');
var cartRoutes = require('./routes/shoppingCart.routes');
var wishRoutes = require('./routes/wishList.routes');
var invoiceRoutes = require('./routes/invoice.routes');


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(cors())

//app.use('/api', userRoutes);
app.use('/api', businessRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', wishRoutes);
app.use('/api', invoiceRoutes);

module.exports = app;
