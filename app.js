'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var businessRoutes = require('./routes/business.routes');
var userRoutes = require('./routes/user.routes');
var categoryeRoutes = require('./routes/category.route');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(cors())

//app.use('/api', userRoutes);
app.use('/api', businessRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryeRoutes);


module.exports = app;
