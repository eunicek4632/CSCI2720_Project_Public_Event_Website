const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteEvent: {
        type: [Number],
        required: true
    } //,
    //     //icon: {
    //     //data: Buffer,
    //     //contentType: String
    //     //}
});


module.exports = mongoose.model("user", UserSchema);