const express = require("express");
var csrf = require('csurf')
const app = express();
const crypto = require("crypto");
const sha256Hasher = crypto.createHmac("sha256","flag{anyH3adsf0rCS}")
const path = require('path');
var cookieParser = require('cookie-parser')
require("dotenv").config()
const mysql = require("mysql");
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
  

const db = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1", 
    user: "root",
    password: "",
    database: "usercreddb",
    port: "3306"
})  

db.getConnection((err, connection)=> {
    if(err) throw(err)
    console.log("DB connected successful: " + connection.threadId);
    
})









app.get('',function(req,res) {
    res.render('index',{usercookieval:"Weak",loginType:"/login"})
  });

// Assigning cookie value
app.post('/selectSecurity',function(req,res){
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
 

app.get("/selectSecurity",(req,res) =>{
    res.render('selectSecurity',{usercookieval:"Select Level",loginType:"/loginSecure"})
})


app.get("/login",  (req,res) => {
    
    res.render('login',{message: '',loginType:"/loginSecure"})
    
})


app.get("/loginSecure", csrfProtection, (req,res) => {
    
    res.render('loginSecure',{message: '',loginType:"/loginSecure", csrfToken:req.csrfToken()})}
    
    )


app.post("/loginSecure",csrfProtection, (req, res)=>{
        var cookie = req.cookies.Level;
        console.log("Cookie:"+cookie);
        console.log("THis:   "+csrfProtection)
    
        const user = req.body.username;
        const password = req.body.password;
        console.log(user)
        strongLevelBrute(user,password,res,req)
      
     
    
    
    })    


// LOGIN(Find level)
app.post("/login", (req, res)=>{
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
        res.cookie('Level', weak)
        weakLevelBrute(user, password,res)
    }
 


})

  

function  weakLevelBrute(user,password,res,req){
db.getConnection( async(err, connection)=>{
    
    if (err) throw (err)
    const sqlSearch = "Select * from usercred where user = ?"
    const search_query = mysql.format(sqlSearch,[user])

    await connection.query (search_query, async (err, result) => {

    connection.release()

    if(err) throw(err)

    if (result.length == 0){
        
        console.log("Username not registered")
        res.render('login',{message:'Invalid Username!'})
    }

    else{
        const hashedPassword = result[0].password
        
            if(await  crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                res.render('login',{message:'User logged in Successfully'})
               
    
            }
            else{ 
                console.log("pass incorrect")
                res.render('login',{message:'Password Incorrect!'})
                
            }
            
        } 
})
})  

}



function  mediumLevelBrute(user,password,res){
    db.getConnection( async(err, connection)=>{
        
        if (err) throw (err)
        const sqlSearch = "Select * from usercred where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
    
        await connection.query (search_query, async (err, result) => {
    
        connection.release()
    
        if(err) throw(err)
    
        if (result.length == 0){
            await delay(5000);
            
            res.render('login',{message:'Username/Password is incorrect!'})
        }
    
        else{
            const hashedPassword = result[0].password
    
            if(await  crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                res.render('login',{message:'User logged in Successfully'})
               
    
            }
            else{ 
                await delay(5000);
                
                
                res.render('login',{message:'Username/Password is incorrect!'})
                
                
            }
        }
    })
    })  
    
    }




    
function  strongLevelBrute(user,password,res,req){
    db.getConnection( async(err, connection)=>{
        
        if (err) throw (err)
        const sqlSearch = "Select * from usercred where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
    
        await connection.query (search_query, async (err, result) => {
    
        connection.release()
    
        if(err) throw(err)
    
        if (result.length == 0){
            await delay(5000);
            res.render('loginSecure',{message:'Username/Password is incorrect!',csrfToken: req.csrfToken()})
        }
    
        else{
            const hashedPassword = result[0].password
            try {
                if(await  crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                    res.render('loginSecure',{message:'User logged in successfully',csrfToken: req.csrfToken()})
                   
        
                }
                else{ 
                    await delay(5000);
                    console.log("pass incorrect")
                    res.render('loginSecure',{message:'Username/Password is incorrect!',csrfToken: req.csrfToken()})
                    
                }
                
            } catch (error) {
                console.log(error)
            }
    
             
        }
    })
    })  
    
    }
    


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }



