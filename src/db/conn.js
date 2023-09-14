const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weatherdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(()=>{
    console.log("connection successfully");
  }).catch(()=>{
    console.log("no connection");
  })