const express = require("express");
var csrf = require('csurf')
const app = express();
const loginRoutes = require('./routes/loginroutes')
const selectSecurityRoutes = require('./routes/selectSecurityRoutes')
const loginSecureRoutes = require('./routes/loginSecureRoutes')
const crypto = require("crypto");
const sha256Hasher = crypto.createHmac("sha256","flag{anyH3adsf0rCS}")
const path = require('path');
var cookieParser = require('cookie-parser')
require("dotenv").config()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
app.use(cookieParser());
const delay = ms => new Promise(res => setTimeout(res, ms));

var loginType = "/login"

 
 // your route configuration here 
app.use(express.json())
app.use(express.static('public'))
app.use('/stylesheets', express.static(__dirname+'public/stylesheets'))
const port = 3000
app.listen(port, ()=> console.log('Server started on port 3000'))

app.set('views', './views')
app.set('view engine', 'ejs')
  

  
 


app.use(loginRoutes)


app.use(selectSecurityRoutes)
app.use(loginSecureRoutes)
app.get('',function(req,res) {
    res.render('index',{usercookieval:"Weak",loginType:"/login"})
  });

// Assigning cookie value







// LOGIN(Find level)


  