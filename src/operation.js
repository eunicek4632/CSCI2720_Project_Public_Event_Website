var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const utf8 = require('utf8');
const bcrypt = require("bcryptjs")

const saltRounds = 10;
const fetch = require('node-fetch');

const User = require("./model/User");
const Event = require("./model/Event");
//
// Create user
//
router.post('/reg', function(req, res) {
    console.log("create new user!");

    // generate id for user
    var id = Date.now();
    var password_input = req.body['password'];
    var hash = bcrypt.hashSync(password_input,saltRounds);
    try {
        var user = new User({
            username: req.body['username'],
            password: hash,
            userID: id,
            favoriteEvent: [1]
        });

        user.save()

        var payload = {
            "success": 1,
            "inserted": {
                "userID": id      
            }
        }

        res.status(201).send(payload);

    } catch (err) {
        console.log(err.message);
        var payload = {
            "success": 0,
            "message": "Error in Saving"
        }
        res.status(500);
    }
});


//
// Login
//
router.post('/login', async(req, res) => {
    console.log("log in user!");

    var username_input = req.body['username'];
    var password_input = req.body['password'];
    // var hash = bcrypt.hashSync(password_input);
    // hash successful
    try {
        var user = await User.findOne({ username: username_input });

        if (!user) {
            var payload = {
                "success": 0,
                "message": "User Not Exist"
            }
            res.status(211).send(payload);
        }

        

        var isMatch = bcrypt.compareSync(password_input,user.password);
        console.log(isMatch);
        if (!isMatch) {
            var payload = {
                "success": 0,
                "message": "Incorret Password!"
            }

            res.status(212).send(payload);
        }

        var payload = {
            "success": 1,
            "credential": user.userID,
            "username1": user.username
        }

        res.status(200).send(payload);


    } catch (e) {
        console.error(e);
        var payload = {
            "success": 0,
            "message": "Server Error"
        }
        res.status(500).send(payload);
    }


});

router.get('/getEvent', function(req, res) {
    console.log('now get events');

    try {
        Event.find({},
            function(err, events) {
                if (!events) {
                    var payload = {
                        "success": 0,
                        "message": "No event to fetch"
                    }
                    res.status(211).send(payload);
                }

                //console.log(events);


                var payload = {
                    "success": 1,
                    "message": "get event success",
                    "event": events
                }


                res.status(200).send(payload);
            });




    } catch (e) {
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
router.get('/flush', function(req, res) {
    console.log('now drop old set of data');

    mongoose.connection.collections['events'].drop(function(err) {
        console.log('collection dropped');
    })

    console.log('now start flush');

    let url = "https://ogcef.one.gov.hk/event-api/eventList.json";
    let settings = { method: "get" };

    fetch(url, settings).then(res => res.json()).then((json) => {
        // parse the data 
        var replacer = function(key, value) {
            return typeof value === 'undefined' ? null : value;
        }
        var jsonParsed = JSON.parse(JSON.stringify(json, replacer));

        console.log("ID" + jsonParsed[0].event_id + " - Summary:" + jsonParsed[0].event_summary + "- Date:" + jsonParsed[0].event_date + "- Organizer:" + jsonParsed[0].event_org + "- Location:" + jsonParsed[0].event_location + "- ICS:" + jsonParsed[0].event_ics + "\n");

        try {
            for (var i = 0; i < 50; i++) {

                var event = new Event({
                    eventID: jsonParsed[i].event_id,
                    eventSummary: jsonParsed[i].event_summary,
                    eventDate: jsonParsed[i].event_date,
                    eventOrganizer: jsonParsed[i].event_org,
                    eventLocation: jsonParsed[i].event_location,
                    eventICS: jsonParsed[i].event_ics
                });

                event.save();
            }


            var payload = {
                "success": 1,
                "message": "Flush is completed successfully"
            };
            res.status(200).send(payload);
        } catch (err) {
            console.log(err.message);
            var payload = {
                "success": 1,
                "message": "Event is saved"
            }
            res.status(500);
        }

    });

});

//
// Post Comment
//
router.post('/postComment',function(req,res){
    var data = req.body['comments'];
    var event_id = req.body['eventID'];

    console.log(data);
    console.log(event_id);
});
//
// Create Event
//
router.post('/createEvent',function(req,res){

});
//
// Update Event
//
router.put('/updateEvent',function(req,res){

});


//
// Like an event
//
router.post('/likeEvent',async(req,res)=>{
    var event_id = req.query['eventID'];
    var user_id = req.query['userID']; 
    console.log('hi'+event_id+'bye'+user_id);

    var query = User.findOne({userID: user_id}).select('favoriteEvent');
    
    query.exec(async(err,result)=>{
        if (err) {console.log(err);}

        console.log(result.favoriteEvent);
        list = result.favoriteEvent;

        var found = list.find(element => element == event_id);
        console.log('found' + found);

        // great success
        if (list.find(element => element == event_id) == undefined) {
            let doc = await User.findOneAndUpdate({userID: user_id}, {$push:{favoriteEvent:event_id}},{new: true});
            console.log('hi');
        }else{
            
            let doc = await User.findOneAndUpdate({userID: user_id}, {$pull:{favoriteEvent:event_id}});
            console.log('bye')
        }

        res.status(200).send();
    })
    
    

    

    // console.log(doc.username);

    

});

//
// Get user's fav event list
//
router.get('/getUserFavEvents',function(req,res){
    var user_id = req.query['userID']; 

    var query = User.findOne({userID: user_id}).select('favoriteEvent');

    query.exec(function(err,result){
        if (err) {
            console.log(err);
        }
        else{
            // var payload ={
            //     "success": 1,
            //     "list": result.favoriteEvent
            // }
            console.log(result);
            res.status(200).send(result.favoriteEvent);
        }
    })
});



//
// Post Comment
//
router.post('/postComment',function(req,res){

});
//
// Create Event
//
router.post('/createEvent',function(req,res){

});
//
// Update Event
//
router.put('/updateEvent',function(req,res){

});

//
// Delete Event
//
router.delete('/deleteEvent',function(req,res){

    //use event id to delete the event object and comment object of it
    var event_id = req.query['eventID'];
    console.log(event_id);

    Event.deleteOne({eventID: event_id}, function(err){
        if (err) {
            return console.log(err);
        }
    })
})

module.exports = router;