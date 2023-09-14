require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port= process.env.PORT;
var hbs= require("hbs");

const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
const auth= require("./middleware/auth");

/////////// require mongoose part
const Register = require('./models/schema');
require("./db/conn");
const Reggister= require("./models/schema");

////////// basic commands for finding the files
const staticPath= path.join(__dirname,"../public");
const viewsPath= path.join(__dirname,"../template/views");
const partialsPath= path.join(__dirname,"../template/partials");

////////// basic commands to project on server
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


///////////////////////     routing        //////////////////
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/secret", auth,(req,res)=>{
    console.log(req.cookies.jwt);
    res.render("secret");
})

app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather",(req,res)=>{
    res.render("weather");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})

/////////////////   add documents

app.post("/register",async(req,res)=>{
    try{
        const password= req.body.password;
        const cpassword= req.body.cpassword;
        if(password=== cpassword){
            const insert= new Reggister({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
                
            }) 
            //////////add middleware function which i had defined in schems
            const token= await insert.generateAuthToken();
            console.log("created token  "+ token);

            const registerd= await insert.save();
            console.log(registerd);
           // res.send(registerd);     
          res.render("login");

        }
        else{
            ale("wrong email");
            console.log("wrong passwords");
        }
    }
    catch(e){
        res.send(e);
    }
})


////////////////////////////    login page

app.post("/login",async(req,res)=>{
    try{
        const email= req.body.email;
        const pass= req.body.password;
        

        const data= await Reggister.findOne({email:email});
        
        const match= await bcrypt.compare(pass,data.password);
        ///// token generate
        const token= await data.generateAuthToken();
        console.log("created token"+ token);
        
        res.cookie("jwt",token,{
            expires: new Date(Date.now()+ 120000),
            httpOnly:true
        })
        ////////// yha console mei read nhi ker sakta
       // console.log(req.cookies.jwt);

        if(match){
            res.render("index");
        }
        else{
            res.send("wrong password");
        }
    }
    catch(e){
        res.send(e);
    }
})

////////////// logout user

app.get("/logout", auth,(req,res)=>{
    try{
    res.clearCookie("jwt");
    console.log("logout successfully")
    res.render("login");
    }
    catch(e){
        res.status(500).send(e);
    }
})


app.get("*",(req,res)=>{
    res.render("404error",{
        content: "Oops page not found ",
    })
})

app.listen(port,(err)=>{
    console.log("running server");
})