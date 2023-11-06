const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const secretKey = `${process.env.ACCESS_TOKEN_SECRET}`

function generateAccessToken (user){
    return jwt.sign(user, secretKey, {expiresIn : "30000s"})
}

module.exports = {generateAccessToken}