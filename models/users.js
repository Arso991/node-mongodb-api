const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    username :{
        type: String,
        require: true,
        unique: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    email_verified : {
        type: Boolean,
        default: false
    },
    code:{
        type: String
    },
    email_verified_at : {
        type: Date
    },
    created_at : {
        type: Date,
        default: mongoose.now
    }
})

const Users = mongoose.model("users", usersSchema);

module.exports = Users