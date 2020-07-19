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
	    content: {
	        type: String,
	        required: true
	    }
})


module.exports = mongoose.model("comment",commentSchema)