const express = require('express')
const router = express.Router();
const db = require('../models/dbConnection')
const sqlite3 = require('sqlite3').verbose()
const crypto = require("crypto");

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
const delay = ms => new Promise(res => setTimeout(res, ms));

     
async function  strongLevelBrute  (user,password,res,req){
    
        
     
        
        db.all("Select * from usercred where user = ?",user, (err, row) =>{
        console.log(row)
        
    
        
    
      
        if (row.length == 0){
            
            
            res.render('loginSecure',{message:'Username/Password is incorrect!',csrfToken: req.csrfToken()})
        }
    
        else{
            const hashedPassword = row[0].password
            try { 
                if(crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                    res.render('loginSecure',{message:'User logged in successfully',csrfToken: req.csrfToken()})
                   
        
                }
                else{ 
                     delay(5000);
                    console.log("pass incorrect")
                    res.render('loginSecure',{message:'Username/Password is incorrect!',csrfToken: req.csrfToken()})
                    
                }
                
            } catch (error) {
                console.log(error)
            }
        }
             
        })
    
      
    
}



router.get("/loginSecure", csrfProtection, (req,res) => {
    
    res.render('loginSecure',{message: '',loginType:"/loginSecure", csrfToken:req.csrfToken()})}
    
    )


router.post("/loginSecure",csrfProtection,  async (req, res)=>{
        var cookie = req.cookies.Level;
        console.log("Cookie:"+cookie);
        console.log("This:   "+csrfProtection)
    
        const user = req.body.username;
        const password = req.body.password;
        console.log(user)
        strongLevelBrute(user,password,res,req)
        
      
     
    
    
    })    

module.exports =router;