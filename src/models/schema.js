const mongoose= require("mongoose");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const wetschema= new mongoose.Schema({
    firstname:{
        type:String, required:true,
    },
    lastname:{
        type:String, required:true,
    },
    email:{
        type:String, required:true,unique:true
    },
    gender:{
        type:String,
    },
    password:{
        type:String, required:true,
    },
    cpassword:{
        type:String, required:true,
    },
    tokens: [{
        tokeni:{
            type:String, required:true,
        }
    }]
    
})

/////// middleware for token
wetschema.methods.generateAuthToken= async function(){
    try{
        const token= jwt.sign({_id:this._id.toString},"mynameisrupeshmeipapahoonnhiisduniyaka");
        this.tokens= this.tokens.concat({tokeni:token});
        await this.save();
        return token;
    }
    catch(e){
        res.send("error" + e);
    }
}


///// middleware for password
wetschema.pre("save",async function(next){
    if(this.isModified("password")){
   // const hash= await bcrypt.hash(this.password,10);
    console.log(`${this.password}`);
    this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
///////// for cpassword

/*wetschema.pre("save",async function(next){
    if(this.isModified("cpassword")){
   // const hash= await bcrypt.hash(this.password,10);
    console.log(`${this.cpassword}`);
    this.cpassword= await bcrypt.hash(this.cpassword,10);
    }
    next();
})*/

const Reggister= new mongoose.model("Register",wetschema);
module.exports= Reggister;