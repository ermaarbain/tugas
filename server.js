'use strict';

const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const app = express();
var port = 3000;

//import models
require ('./app/models/mobil');

//views
app.use (express.static('public/'));
app.use (bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views',__dirname + '/app/views');
app.set('view engine', 'jade');

//routes
var mobil_routes = require('./app/controllers/mobil');
app.use ('/mobil',mobil_routes);

app.get('/',function (req, res) {
	res.redirect('/mobil');
	});

//main loop
connect()
.on('error', console.log)
.on('disconnected',connect)
.once('open',listen);

function listen() {
	app.listen(port);
	console.log('express app started on port' + port);
	}
	
function connect () {
	var option = {server: {socketOption: {keepAlive: 1}}};
	return mongoose.connect ('mongodb://localhost/cloud', option).connection;
	}