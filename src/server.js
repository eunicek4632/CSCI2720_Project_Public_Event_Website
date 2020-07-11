var express = require('express');
var app = express();
const path = require('path');

// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))

var mongoose = require('mongoose');

// Config
mongoose.connect('mongodb://zxip5:x35197@localhost/zxip5');

var db = mongoose.connection;
//upon connection failure
db.on('error', console.error.bind(console, 'Connection error'));
//upon opening database successfully
db.once('open', function() {
    console.log("Connected succesfully");
});

// Config
var server = app.listen(2003);



app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+"/index.html"));
    console.log(__dirname);
});

app.get('/hi', function(req,res){
    res.send("hello world");
});

