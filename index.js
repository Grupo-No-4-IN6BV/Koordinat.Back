'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = /*process.env.PORT || --producción*/ 3800;
var user = require('./controllers/user.controller')


mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/DBKoordinat', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        user.initAdmin();
        console.log('connect to database');
        app.listen(port, ()=>{
            console.log('server express is running')
        })
    }).catch((err)=>console.log('connection error to database', err))

