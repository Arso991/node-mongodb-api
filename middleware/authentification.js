const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretKey = `${process.env.ACCESS_TOKEN_SECRET}`

const authentification = async (req, res, next)=>{

 const authHeaders = req.headers.authorization;

 if(!authHeaders){

    res.status(401).json({msg:"Accès non autorisé"}).end();

 }else{
    const token = authHeaders.split(" ")[1];

    if(!token){

        res.status(401).json({msg:"Accès non autorisé"}).end();
    }

    jwt.verify(token, secretKey, (err, data)=>{

        if(err){
            
            res.status(401).json({msg:"Accès non autorisé", err});
            return
        }

        req.user = data
        next()
    })
 }
}

module.exports = {authentification}