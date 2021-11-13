const express = require('express')
const router = express.Router();
const crypto = require("crypto");

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
router.post('/selectSecurity',function(req,res){
    const usercookievalue = req.body.option
    res.cookie('Level',usercookievalue, { maxAge: 900000, httpOnly: true });
    console.log(usercookievalue)
    if(usercookievalue!="Strong"){
        loginType = "/login"
        csrfProtection= null
        console.log(csrfProtection)
    }
    else{
        loginType = "/loginSecure"
        csrfProtection = csrf({ cookie: true })

    }
    res.render('selectSecurity',{usercookieval:usercookievalue,loginType:loginType})
})
 

router.get("/selectSecurity",(req,res) =>{
    res.render('selectSecurity',{usercookieval:"Select Level",loginType:"/loginSecure"})
})


module.exports =router;