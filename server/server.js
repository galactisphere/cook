// Define defaults
const express = require('express'),
    	app     = express(),
   		port    = parseInt(process.env.PORT, 10) || 3000;

const db = require("./models/db")
const bodyParser = require("body-parser")
const fse = require('fs-extra')
const electron = require("../index");
const Lowdb = require('lowdb');

app.set("view engine", "pug")

//var remote = require("electron").remote

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: false}))

//const documentsDir = remote.getPath("home")

// POST save
app.post("/db/save", function(req, res) {

  console.log(req.body)
  var data = JSON.stringify(req.body)
	var parsedData = JSON.parse(data)

  var filename = electron.path("documents") + "/The Chef's Pocket/" + parsedData.title + ".json"

  if (fse.pathExistsSync(filename)) {
    res.status(409).send({
      error: "Recipe title already exists"
    })
  } else {
    // Write html
    //const handlebars = require("../src/js/handlebars")
    //handlebars.generateHTML(parsedData)

    // Write to database
    db.read(parsedData)

    // Write to documents
    fse.outputJSONSync(filename, parsedData)
    console.log("Added " + filename)
  }
})

// POST content
app.post("/content", function(req, res){
  var data = req.body
  console.log(data.id)
  console.log(db.search(data.id))
  res.send(db.search(data.id))
})

// POST delete
app.post("/delete", function(req, res){

})

// GET db
app.get("/db/get", function(req, res){
  res.send(fse.readJSONSync("db/db.json"))
})

// GET path
app.get("/path", function(req, res){
  res.send(electron.path("userData"))
})



app.listen(port, function() {
  console.log("Server is running on port 3000");
});