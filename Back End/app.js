
var express = require('express')
var app = express()
var https = require('https')
var mysql = require('mysql')
var cors = require('cors')
var session = require('express-session')
var path = require('path');

var bodyParser = require('body-parser');


var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(express.json());

app.use(myLogger)
app.use(cors());

var pool = mysql.createPool({
    connectionLimit: 25,
    host: 'mysql.freehostia.com',
    user: 'corhol5_parkingspotfinder',
    password: 'Kingbatabob7!',
    port: '3306',
    database: 'corhol5_parkingspotfinder'


});


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/*
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  
});*/
 
app.post('/users/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;


  
    
    pool.getConnection(function (err, connection) {
        console.log("Connected!");

        if (!email || !password || !password_confirmation) {
            res.send({ errormessage: "Please fill in all the fields" });
            return;
        }

        //Check passwords match
        if (password != password_confirmation) {
            console.log('Passwords dont match');
            res.send({ errormessage: "Passwords dont match" });
            return;
        }

          //Check password length
    if (password.length < 6) {
        res.send({ errormessage: 'Password should be atleast 6 characters' });
        return;

    }

        connection.query("SELECT email FROM user WHERE email = ?", [email], (err, result) => {
            if (err) throw err;
          
            //You will get an array. if no users found it will return.

            if (result.length > 0) {
                console.log("we found a user???");
                console.log(result);
                res.send({ errormessage: "Email already exists!" });
               
                return;
            } else {
                connection.query("INSERT INTO user (email, password) VALUES (?,?)", [email, password], (err, result) => {
                    if (err) {
                        res.send({ err: err });
                        return;
                    }
                    res.send(email);
                });
                console.log("inserted new user!");
                return;
            }
      
        });
        connection.release();


    });


});

app.post("/users/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    pool.getConnection(function (err, connection) {


        console.log("Connected!");
        connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
               // res.send({message: "correct"});
            } else {
                res.send({ errormessage: "wrong email or password" });
            }

        });
        connection.release();
    });

});
/*
app.post("/spots/save", (req, res) => {

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const spotLocation = req.body.spotLocation;
    const spotNumber = req.body.spotNumber;
    const parkingDeckLevel = req.body.parkingDeckLevel;
    const streetName = req.body.streetName;

    
    //https://stackoverflow.com/questions/51109559/get-cookie-with-react
    console.log("Connected!");
    db.query("INSERT INTO user (email, password) VALUES (?,?)", [email, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        

    });

    res.send(email);


});







app.get('/', function (req, res) {
    console.log("Connected!");
    res.send('Hello World!')
});
*/

app.listen(5000)