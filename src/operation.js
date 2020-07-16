var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")
//
// Create user
//
router.post('/reg', function(req, res) => {
	console.log("create new user!");
}



module.exports = router;