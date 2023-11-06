const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const MONGODB_URL = "mongodb+srv://arsogn991:kp4nfnzSS3qVHkZd@coursesdb.emifxtz.mongodb.net/?retryWrites=true&w=majority"

const db = async () =>{
    try {
        const client = await mongoose.connect(MONGODB_URL);
        console.log(`DB is connected:${client.connection.host}`)
    } catch (error) {
        console.error(error);
    }
}

module.exports = db