



//'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;



const express = require('express');
const app = express();
const mysql = require("mysql");
const path = require("path");
//app.listen(1337)
const port = 1337;
const host = "localhost";
//const host = "192.168.43.78";


app.use(express.static(__dirname + '/public'));
//app.use("/" + process.env.URL_ADMIN_PATH, express.static(path.join(__dirname, "/public")));

app.listen(port, host, function () {
    console.log("Running at http://" + host + ":" + port);
});

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
require('dotenv').config();
let dbConnection = mysql.createConnection({
    host: process.env.DB_ADMIN_HOST,
    user: process.env.DB_ADMIN_USER,
    password: process.env.DB_ADMIN_PASSWORD
});

//dbConnection.connect((err) => {
//    //check connection errors
//    if (err) {
//        return console.error("ERROR: " + err.message);
//    }
//    console.log("MySql-DB connection established...");
//    createDB();
//});

//dbConnection.query("SELECT * FROM cardealers_help.scania_questions", function (err, result, fields) {

dbConnection.connect(function (err) {
    dbConnection.query("SELECT * FROM cardealers_help.volvo_questions", function (err, result, fields) {
        console.log("Mysql DB Query");
        if (err) throw err;
        console.log(result);
    });
});











