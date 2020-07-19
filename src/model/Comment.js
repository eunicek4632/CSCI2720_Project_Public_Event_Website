const mongoose = require("mongoose");

var commentSchema = mongoose.commentSchema({
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
})


module.exports = mongoose.model("comment",commentSchema)