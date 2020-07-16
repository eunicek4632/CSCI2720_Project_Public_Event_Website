var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")

const User = require("./model/User");

//
// Create user
//
router.post('/reg', function(req, res){
	console.log("create new user!");


	// generate id for user
	var id = Date.now();
	console.log(username_input);
	console.log(password_input);

	try{
		var user = new User ({
			username: req.body['username'],
			password: req.body['password'],
			userID: id
		});

		user.save()

		res.status(201).send(user);

	}catch(err) {
		console.log(err.message);
		res.status(500).send("Error in Saving");
	}
});

router.post('/login', function(req, res){
	console.log("log in user!");
});


module.exports = router;