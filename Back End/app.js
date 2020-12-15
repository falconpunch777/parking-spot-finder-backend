/*


app.get("/users/signin", (req, res) => {

    https.post('client token', (response) => {
        let rdata = '';

        // called when the complete response is received.
        response.on('end', () => {
            if (response.statusCode === 200) {
                //https://www.youtube.com/watch?v=_EP2qCmLzSE
               //formulate data to send 
             //   res.send({ });
            } else {
                res.send("Error: Status code is not 200");
            }

        });

    }).on("error", (error) => {
        console.log("Error: " + error.message);
        res.send("Error: " + error.message);
    });

});

app.get("/test", (req, res) => {

    https.get('https://api.weatherapi.com/v1/current.json?key=6cc343cc766a4b488c934116202011&q=Atlanta', (response) => {
        let rdata = '';

        // called when a data chunk is received.
        response.on('data', (chunk) => {
            rdata += chunk;
        });

        // called when the complete response is received.
        response.on('end', () => {
            if (response.statusCode === 200) {
                var parsedBody = JSON.parse(rdata);
                var temp_f = parsedBody["current"]["temp_f"];
                res.send({ temp_f });
            } else {
                res.send("Error: Status code is not 200");
            }

        });

    }).on("error", (error) => {
        console.log("Error: " + error.message);
        res.send("Error: " + error.message);
    });

});




*/
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

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'mydbtest667'


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

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  
});

app.post('/users/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

   
    console.log("Connected!");
    console.log(req.body.username);
     
           // db.query("SELECT * FROM memer", (_err, result) => { console.log(result)});
    db.query("INSERT INTO user (username, password) VALUES (?,?)",  [username, password], (err, result) => {
        console.log(err);

      


    });
            
    //res.send('hi');
    res.send(username);
       
 


   /*
        db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result) => {
            console.log(err);
        )}
     */

  
    
    //https://www.youtube.com/watch?v=W-sZo6Gtx_E

});






app.get('/', function (req, res) {
    console.log("Connected!");
    res.send('Hello World!')
});


app.listen(5000)