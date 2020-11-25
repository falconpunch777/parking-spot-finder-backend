var express = require('express')
var app = express()
var https = require('https')


var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)

app.get('/', function (req, res) {
    res.send('Hello World!')
})


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






app.listen(5000)