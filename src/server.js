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
// Data schema
//

var userSchema = mongoose.Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteEvent: {
        type: [Number],
        required: true
    } //,
    //     //icon: {
    //     //data: Buffer,
    //     //contentType: String
    //     //}
});

//
// Create user account
//
var user = mongoose.model('user', userSchema);


var commentSchema = mongoose.Schema({
    commentID: {
        type: Number,
        required: true,
        unique: true
    },
    eventID: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    like: {
        type: Number,
        required: true
    }
});


var comment = mongoose.model('comment', commentSchema);

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + "/index.html"));
   console.log(__dirname);
});

app.get('/login', function(req, res) {
    console.log("hi there");
   res.sendFile(path.join(__dirname + "/login.html"));
   
});

app.get('/home', function(req, res) {
    console.log("hi there");
   res.sendFile(path.join(__dirname + "/home.html"));
   
});

app.get('/favourites', function(req, res) {
    console.log("hi there");
   res.sendFile(path.join(__dirname + "/favourites.html"));
   
});

app.get('/login.js', function(req, res) {
   res.sendFile(path.join(__dirname + "/login.js"));
   
});


app.post('/insertUser', function(req, res) {

    var idMax;
    user.findOne()
        .sort('-userID')
        .exec(function(err, e) {
            if (e == null) {
                idMax = 0;
            } else {
                idMax = e.userID;
            }
            console.log(idMax);
            var f = new user({
                userID: idMax + 1,
                username: req.body['username'],
                password: req.body['password'],
                $push: {
                    favoriteEvent: 0
                }
                //icon: {
                //data = fs.readfileSync(req.files.userphoto.path),
                //contentType = 'image/png'
                //}
            })
            f.save(function(err) {
                if (err)
                    res.send(err);
                res.send("User inserted with ID = " + f.userID);
            });
        });
});


app.post('/insertComment', function(req, res) {

    var idMax;
    user.findOne()
        .sort('-commentID')
        .exec(function(err, e) {
            if (e == null) {
                idMax = 0;
            } else {
                idMax = e.commentID;
            }
            var f = new user({
                commentID: idMax + 1,
                eventID: req.body['eventID'], //to be changed into history auto-fetch
                userID: req.body['userID'], // to be changed into history auto-fetch
                content: req.body['content'], // to be changed into history auto-fetch
                timestamp: Date.Now,
                like: 0
            })
            f.save(function(err) {
                if (err)
                    res.send(err);
                res.send("Comment inserted with id=" + f.commentID);
            });
        });
});



//image insert
//module.exports = new mongoose.model('icon', userSchema);

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//var fs = require('fs');
//var multer = require('multer');
//var path = require('path');

//var storage = multer.diskstorage({
//destination: (req, file, cb) => {
//cb(null, 'uploads')
//},
//filename: (req, file, cb) => {
//cb(null, file.fieldname)
//}
//});

//var imgModel = require('./model');

//app.get('/', (req, res) => {
//imgModel.find({}, (err, items) => {
//if (err) {
//console.log(err);
//}
//else {
//res.render('app', { items: item });
//}
//});
//});

//app.use(multer({
//dest: './2720proj-icons/',
//rename: function(fieldname, filename) {
//return filename;
//}
//}))