const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const MONGODB_CONNECT_URI = "mongodb+srv://arsogn991:kp4nfnzSS3qVHkZd@coursesdb.emifxtz.coursedb.net/coursesdb?retryWrites=true&w=majority"

const db = async () =>{
    try {
        const client = await mongoose.connect(MONGODB_CONNECT_URI);
        console.log(`DB is connected:${client.connection.host}`)
    } catch (error) {
        console.error(error);
    }
}

module.exports = db