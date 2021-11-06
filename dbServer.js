const express = require("express");
const app = express();

const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",
    user:"root",
    password:"",
    database:"userdb",
    port:"3307"
})

db.getConnection((err, connection)=> {
    if(err) throw(err)
    console.log("DB connected successful: " + connection.threadId);
})