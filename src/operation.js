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


//
// Login
//
router.post('/login', async(req, res)=>{
	console.log("log in user!");

	var username_input = req.body['username'];
	var password_input = req.body['password'];

	try{
		var user = await User.findOne({username:username_input});

		if (!user) {
			var payload = {
				"success": 0,
				"message": "User Not Exist"
			}
			return res.status(211).send(payload);
			// return res.status(400).send('User not found!');
		}

		console.log("from server" + user.password);

		var isMatch = await (password_input == user.password);
		
		if (!isMatch) {
			var payload = {
				"success": 0,
				"message": "Incorret Password!"
			}

			return res.status(212).send(payload);
		}

		var payload = {
			"success": 1,
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


//
// Flush
//
router.get('/flush', function(req,res){
	console.log('now start flush');

	const url = "https://ogcef.one.gov.hk/event-api/eventList.json";

	const fetchJSON = async url =>{
		try{
			const response = await fetch(url);
			const json = await response.json();

			var replacer = function(key,value) {
				return typeof value === 'undefined' ? null : value;
			}

			var jsonParsed = JSON.parse(JSON.stringify(json,replacer));

			for (var i = 0; i < 3; i++) {
				console.log('eventID:' + jsonParsed[i].event_id + 'eventSummary:' + jsonParsed[i].event_summary +'\n');
			}
		} catch{
			console.log(error);
		}
	}
});


module.exports = router;