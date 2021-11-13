const mysql = require("mysql");
const { OPEN_CREATE, OPEN_READWRITE } = require('sqlite3');
const sqlite3 = require('sqlite3').verbose()

var path = require('path');
const DB_PATH = path.join(__dirname,"data.sqlite")
console.log(DB_PATH)
const db = new sqlite3.Database(DB_PATH, OPEN_READWRITE, (err) =>{
    if (err)
       return console.error(err.message)
    console.log("Connected to in-memory SQLite database")

    db.exec('PRAGMA foreign_keys = ON;', (error) =>{ 
        if(error)
         console.error("Error enabling foreign keys")
        else
         console.log("Foreign Key Enforcement is on")

    })
})
db.all("select name from sqlite_master where type='table'", (err, table) => {
    console.log(table);
});
db.all("Select * from usercred", (err,row)=>{
    console.log(row)
})
db.get("Select * from usercred where user = ?","admin", (err, row) =>{
    console.log(row)
})

module.exports =db
  