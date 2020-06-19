// Define defaults
const express = require('express'),
    	app     = express(),
   		port    = parseInt(process.env.PORT, 10) || 3000;

const db = require("./models/db")
const bodyParser = require("body-parser");
const fs = require('fs');
const remote = require("electron")

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: false}))

const documentsDir = remote.getPath("documents")

// POST request for save
app.post("/save", function(req, res) {

  var data = JSON.stringify(req.body)
	var parsedData = JSON.parse(data)

  db.read(data)

  var indexNum = 1
  function writeFile() {
		if (parsedData.recipe == "") {
			var filename = documentsDir + "/The Chef's Pocket/Untitled " + indexNum.toString() + ".json"
		} else {
			var filename = documentsDir + "/The Chef's Pocket/" + parsedData.recipe + " " + indexNum.toString() + ".json"
		}
    fs.writeFile(filename, data, { flag: "wx" }, function(err) {
      if (err) {
        indexNum = indexNum + 1
        writeFile()
      } else {
        console.log("Written " + filename + " to /db directory")
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