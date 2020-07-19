const mongoose = require("mongoose");

var commentSchema = mongoose.commentSchema({
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