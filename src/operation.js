var express = require('express');
var router = express.Router();

//
// Create user
//
router.post('/reg', async(req, res) => {

    var idMax;

    const {
        username,
        password
    } = req.body;

    try {
        let user1 = await user.findone()
            .sort('-userID')
            .exec(function(err, e) {
                if (e == null) {
                    idMax = 0;
                } else {
                    idMax = e.userID;
                }

                var f = new user({
                    userID: idMax + 1,
                    username: username,
                    password: password,
                    $push: {
                        favoriteEvent: 0
                    }
                });
                const salt = await bcrypt.genSalt(10);
                f.password = await bcrypt.hash(password, salt);

                await f.save(function(err) {
                    if (err)
                        res.send(err);
                    res.send("User inserted with ID = " + f.userID);
                })
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});


//
// Log in
//
router.post("/login",async(req, res) => {
        const {
            username,
            password
        } = req.body
        try {
            let user1 = await user.findone({
                username
            });
            if (!user1) {
                return res.status(400).json({
                    message: "No this user."
                });
            };

            const isMatch = await bcrypt.compare(password, user1.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Wrong password."
                });

        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }

)



module.exports = router;