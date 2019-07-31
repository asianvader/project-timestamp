// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.listen(3000);

app.get("/api/timestamp/:date_string?", function (req, res) {
  let dateString = req.params.date_string;

  // to test if the req is a unix timestamp and convert to UTC
  if (/[0-9]{10}/.test(dateString)) {
    let dateStringToInt = parseInt(dateString);
    let unixToUtc = new Date(dateStringToInt*1000).toUTCString();
    res.json({
      "unix": dateStringToInt,
      "utc": unixToUtc
    });
  // to test if the req is empty
  } 
  else if (dateString === undefined) {
    console.log('should have no query string');
    let dateToday = new Date().toUTCString();
    let unixTimestamp = new Date().getTime()/1000;
    res.json({
      "unix": unixTimestamp,
      "utc": dateToday
    });
  //to test if req is a valid  
  } else if(/[A-Za-z]+/.test(dateString )) {
    res.json({
      error: "Invalid Date"
    });
  // if req is in utc format then convert to UNIX
  } else {
    let unixTimestamp = new Date(dateString).getTime()/1000;
    let utcDate = new Date(dateString).toUTCString();
    res.json({
      "unix": unixTimestamp,
      "utc": utcDate
    });
  }
}); 
