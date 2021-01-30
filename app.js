//'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const hash = require('sha256');
const mysql = require("mysql");
//app.listen(1337)
const port = 1337;
//const host = "localhost";
const host = "127.0.0.1";

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  name: "sid",
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESS_SECRET,
  cookie:{maxAge:600000}
}));

//Get add ajax req
app.post('/add', function(req,res){
  var error = 0;
  var status_code =200;
  var status_message = "callback success";

  var data = req.body;

  //data.reg_name
  //data.reg_email
  //data.reg_password
  dbInsertion(data);
  return res.status(status_code).send(data);
})

//Register
function dbInsertion(data){
  var connectionObject = dbConnection();

  let safePwd = hash(data.reg_password);
  let sql = 'insert into customer(customer_first_name, customer_last_name, customer_email, customer_password) values (?,?,?,?)';
  connectionObject.query(sql,
    [data.reg_first_name,
      data.reg_last_name,
      data.reg_email,
      safePwd
    ],
  function (err, result) {
    if (err) {
      var error = error + 1;
      var status_code = 404;
      var error_message = "Sorry data could not be entered something is wrong in the sql query syntax";
      console.log("error in the sql query" + status_code);
    }
    else console.log("1 row inserted");
  })
  connectionObject.end();
}

//Get checkEmail Ajax request
app.post('/checkEmail', function(req,res){
  var error = 0;
  var status_code =200;
  var status_message = "callback success";

  var data = req.body;

  //data.reg_name
  //data.reg_email
  //data.reg_password

  dbCheckEmail(data,res);
})

//Register Check Email
function dbCheckEmail(data,res){
  var connectionObject = dbConnection();

  let userdata =  data.reg_email;

  let sql = "SELECT customer_email FROM customer WHERE customer_email = ?";
  connectionObject.query(sql, [userdata], function (err, result) {
    if (err) {
      var error = error + 1;
      var status_code = 404;
      var error_message = "Sorry data could not be entered something is wrong in the sql query syntax";
      console.log("error in the sql query" + status_code)
    }
    else{
      return res.send(result);
    }
  })

  connectionObject.end();
}

//get login Ajax request
app.post('/login', function(req,res){
  var error = 0;
  var status_code =200;
  var status_message = "callback success";

  var data = req.body;

  dbLogin(data,res,req);
})

//Login
function dbLogin(data,res,req){
  var sess = req.session;
  var connectionObject = dbConnection();

  let safePwdCheck = hash(data.login_password);

  let userdata = data.login_email;

  let sql = "SELECT customer_id FROM customer WHERE customer_email = ? and customer_password = '"+ safePwdCheck +"'";
  connectionObject.query(sql, [userdata], function (err, result) {
    if (err) {
      var error = error + 1;
      var status_code = 404;
      var error_message = "Sorry data could not be entered something is wrong in the sql query syntax";
      console.log("error in the sql query" + status_code);
    }
    else {
      req.session.custId = result[0].customer_id;

      return res.send(result);
    }
  })

  connectionObject.end();
}

//Check logged in
app.get('/checkLoggedIn', function(req, res){
  var connectionObject = dbConnection();//Establish connection
  let customerId = req.session.custId; //Customer id from login phase

  if(customerId == null){ //If customer id = null

    return res.send("0");
  }
  //Sql to get all other needed data
  let sql = "SELECT customer_id, CONCAT(customer_first_name, ' ', customer_last_name) customer_full_name  FROM customer WHERE customer_id = '"+ customerId +"'";
  connectionObject.query(sql, function (err, result) { //Execute sql
    if (err) {
      var error = error + 1;
      var status_code = 404;
      var error_message = "Sorry data could not be entered something is wrong in the sql query syntax";
      console.log("error in the sql query" + status_code);
    }
    else {
      return res.send(result);
    }
  })

  connectionObject.end();
})


//Conn to db
function dbConnection() {
  var con =
    mysql.createConnection({
      host: process.env.DB_ADMIN_HOST,
      user: process.env.DB_ADMIN_USER,
      password: process.env.DB_ADMIN_PASSWORD,
      database: process.env.DB_ADMIN_DATABASE

    })
  con.connect(function (err) {
    if (err) throw err;
  })
  return con;
}

app.use(express.static(__dirname + '/public'));
//app.use("/" + process.env.URL_ADMIN_PATH, express.static(path.join(__dirname, "/public")));

app.listen(port, host, function () {
    console.log("Running at http://" + host + ":" + port);

});