var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")

const User = require("./model/User");

//
// Create user
//
router.post('/reg', function(req, res){
	console.log("create new user!");

	// get data
	const { username,password } = req.body;

	// generate id for user
	console.log(Date.now());
	console.log(username);
	console.log(password);

	try{
		var user = new User ({

		});

	}catch(err) {

	}
});

router.post('/login', function(req, res){
	console.log("log in user!");
	console.log(err.message);
	res.status(500).send("Error in Saving");
});


module.exports = router;