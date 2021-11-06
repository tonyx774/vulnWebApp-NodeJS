const express = require("express");

const app = express();
const crypto = require("crypto");
const sha256Hasher = crypto.createHmac("sha256","flag{anyH3adsf0rCS}")
const path = require('path');
var cookieParser = require('cookie-parser')
app.use(cookieParser());
require("dotenv").config()
const mysql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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
    port: "3307"
})  

db.getConnection((err, connection)=> {
    if(err) throw(err)
    console.log("DB connected successful: " + connection.threadId);
    
})









app.get('',function(req,res) {
    res.render('index',{usercookieval:"Select Level"})
  });

// Assigning cookie value
app.post('',function(req,res){
    const usercookievalue = req.body.option
    res.cookie('Level',usercookievalue, { maxAge: 900000, httpOnly: true });
    console.log(usercookievalue)
    res.render('index',{usercookieval:usercookievalue})
})
 




app.get("/login", (req,res) => {
    res.render('login',{message: ''})
    
})


 

 


// LOGIN(LOW LEVEL)
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
 


})



function  weakLevelBrute(user,password,res){
db.getConnection( async(err, connection)=>{
    
    if (err) throw (err)
    const sqlSearch = "Select * from usercred where user = ?"
    const search_query = mysql.format(sqlSearch,[user])

    await connection.query (search_query, async (err, result) => {

    connection.release()

    if(err) throw(err)

    if (result.length == 0){
        
        console.log("Username not registered")
        res.sendStatus(404)
    }

    else{
        const hashedPassword = result[0].password

        if(await  crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
            res.render('login',{message:'User logged in'})
           

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
            
            console.log("Username not registered")
            res.sendStatus(404)
        }
    
        else{
            const hashedPassword = result[0].password
    
            if(await  crypto.createHmac("sha256","flag{anyH3adsf0rCS}").update(password).digest('hex') == hashedPassword) {
                res.render('login',{message:'User logged in'})
               
    
            }
            else{ 
                await sleep(2000);
                console.log("pass incorrect medium")
                
                res.render('login',{message:'Password Incorrect!'})
                
            }
        }
    })
    })  
    
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }