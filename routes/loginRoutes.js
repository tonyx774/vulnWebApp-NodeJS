const express = require('express')
const router = express.Router();
const db = require('../models/dbConnection')
const sqlite3 = require('sqlite3').verbose()
const crypto = require("crypto");

const delay = ms => new Promise(res => setTimeout(res, ms));

function  weakLevelBrute(user,password,res,req){
    db.all("Select * from usercred where user = ?",user, (err, row) =>{
        console.log(row)
    
        if (row.length == 0){
            
            console.log("Username not registered")
            res.render('login',{message:'Invalid Username!'})
        }
    
        else{
            const hashedPassword = row[0].password
            
                if(crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                    res.render('login',{message:'User logged in Successfully'})
                   
        
                }
                else{ 
                    console.log("pass incorrect")
                    res.render('login',{message:'Password Incorrect!'})
                    
                }
                
            } 
    })
    }
    
    
    
    
    
async function  mediumLevelBrute(user,password,res){
        db.all("Select * from usercred where user = ?",user, (err, row) =>{
        
            if (row.length == 0){
                
                
                res.render('login',{message:'Username/Password is incorrect!'})
            }
        
            else{
                const hashedPassword = row[0].password
        
                if(crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                    res.render('login',{message:'User logged in Successfully'})
                   
        
                }
                else{ 
                    delay(5000);
                    
                    
                    res.render('login',{message:'Username/Password is incorrect!'})
                    
                    
                }
            }
        })
        } 
        
        
    
    
    
    
   

router.get("/login",  (req,res) => {
    
    res.render('login',{message: '',loginType:"/loginSecure"})
    
})

router.post("/login", (req, res)=>{
    var cookie = req.cookies.Level;
    console.log("Cookie:"+cookie);
    

    const user = req.body.username;
    const password = req.body.password;
    console.log(user)
    if(cookie=="Weak"){
        console.log("weak")
     weakLevelBrute(user, password,res)
    }
    else if(cookie=="Moderate"){
        mediumLevelBrute(user, password,res)
    }
    else if(cookie=="Strong"){
        console.log("Very Strong")
        strongLevelBrute(user,password,res,req)}
    else{
        res.cookie('Level', "weak")
        weakLevelBrute(user, password,res)
    }
 


})

module.exports =router;