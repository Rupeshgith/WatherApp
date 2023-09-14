const jwt= require("jsonwebtoken");
const Reggister= require("../models/schema");

const auth= async(req,res,next)=>{
    try{
    const token= req.cookies.jwt;
    const verifyuser= await jwt.verify(token, process.env.SECRET_KEY);
    console.log( verifyuser);
    
    next();
    }
    catch(err){
        res.status(401).send(err);
    }
}
module.exports= auth;