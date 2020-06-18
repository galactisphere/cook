// Define defaults
const express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;

const db = require("./models/db")
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: false}))

// POST request for save
app.post("/save", function(req, res) {

  // var data = JSON.parse(req.body)
  //console.log(data)

  console.log(req.body)
  db.read(req.body)


  var filename = 0

  function writeFile() {
    fs.writeFile(__dirname + "/../db/" + filename + ".json", req.body, { flag: "wx" }, function(err) {
      if (err) {
        console.log(filename.toString())
        filename = filename + 1
        writeFile()
      } else {
        console.log("Written " + filename.toString() + ".json to /db directory")
      }
    })
  }


  writeFile()
});

app.listen(port, function() {
  console.log("Server is running on port 3000");
});

/*
// Express
var express = require("express");
const { fstat } = require("fs");
var expressApp = express();

expressApp.use(express.static(__dirname + '/src'));

// Body parser
const bodyParser = require("body-parser");
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

expressApp.post(function(req, res, next){
  next();
});

expressApp.get("/", function(req, res) {
  console.log("This works");
});

expressApp.post("/save", function(req, res) {
  console.log(req.data);
  
  fs.writeFile("", req.body.data, function(err) {
    if (err) {
      return console.log("Express error");
    }

    console.log("File saved");
    res.end("This message will return to client");
  });
  
});

// Express
expressApp.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/