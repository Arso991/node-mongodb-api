const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    title :{
        type: String,
        require: true,
    },
    client_name: {
        type:String,
        require:true
    },
    localisation: {
        type: String,
        require: true
    },
    is_important:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:null
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    created_at : {
        type: Date,
        default: mongoose.now
    }
});

const Course = mongoose.model("courses", courseSchema)

module.exports = Course