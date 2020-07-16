var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")
//
// Create user
//
router.post('/reg', function(req, res){
	console.log("create new user!");
});

router.post('/login', function(req, res){
	console.log("log in user!");
});


module.exports = router;