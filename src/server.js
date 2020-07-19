var express = require('express');
var app = express();
const path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))

var mongoose = require('mongoose');
mongoose.connect('mongodb://zxip5:x35197@localhost/zxip5');

//listen to port x
var server = app.listen(2003);

var db = mongoose.connection;
//upon connection failure
db.on('error', console.error.bind(console, 'Connection error'));
//upon opening database successfully
db.once('open', function() {
    console.log("Connected succesfully");
});

//
// Routing
//
var operation = require('./operation.js')

app.use('/operation',operation);


//
// Routing
//
app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + "/index.html"));
   console.log(__dirname);
});

app.get('/login', function(req, res) {

   res.sendFile(path.join(__dirname + "/login.html"));
   
});

app.get('/createAC', function(req, res) {

   res.sendFile(path.join(__dirname + "/createAC.html"));
   
});
app.get('/home', function(req, res) {
   
   res.sendFile(path.join(__dirname + "/home.html"));
   
});

app.get('/favourites', function(req, res) {
    
   res.sendFile(path.join(__dirname + "/favourites.html"));
   
});

