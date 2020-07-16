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

	try{
		var user = new User ({
			username: req.body['username'],
			password: req.body['password'],
			userID: id,
			favouriteEvent: []
		});

		user.save()

		var payload = {
			"success": 1,
			"inserted":{
				"username" : req.body['username'],
				"userID" : id,
				"password": req.body['password']
			}
		}

		res.status(201).send(payload);

	}catch(err) {
		console.log(err.message);
		var payload = {
			"success": 0,
			"message": "Error in Saving"
		}
		res.status(500).send(payload);
	}
});

router.post('/login', function(req, res){
	console.log("log in user!");

	var username_input = req.body['username'];
	var password_input = req.body['password'];

	console.log(username_input);
	console.log(password_input);
	try{
		var user = User.findOne({username_input});

		if (!user) {
			var payload = {
				"success": 0,
				"message": "User Not Exist"
			}
			res.status(400).send(payload);
		}

		var isMatch = (password_input == user.password);

		if (!isMatch) {
			var payload = {
				"success": 0,
				"message": "Incorret Password!"
			}

			res.status(400).send(payload);
		}

		var payload = {
			"success": 0,
			"credential" : user.userID
		}

		res.status(200).send(payload);


	}catch (e){
		console.error(e);
		var payload = {
			"success": 0,
			"message": "Server Error"
		}
		res.status(500).send(payload);
	}


});


module.exports = router;