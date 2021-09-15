require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const signupRoute = require('./routes')
const uploadRoute = require('./routes/uploadRoutes')
const app = express()
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileUpload')

mongoose.connect('mongodb+srv://smart:' + process.env.MYPASSWORD + '@cluster0.ewfya.mongodb.net/validprofits-auth?retryWrites=true&w=majority?authSourse=yourDB&w=1',
	{useUnifiedTopology : true, useNewUrlParser : true, useFindAndModify : false})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileUpload({useTempFiles : true}))

// app.use(express.static('./public'))
cloudinary.config({ 
  cloud_name: 'smart-codes', 
  api_key: '668982889162186', 
  api_secret: 'oFhZkyC-QeNAZLL2fHgy_NIt4f8' 
});


app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/', signupRoute)
app.use('/upload', uploadRoute)

app.use((req, res, next)=>{
    const error = new Error('An error occured')
    error.status = '404'
    next(error) 
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error :{
            message:  "A system error occured"
        }
    })
})


module.exports = app