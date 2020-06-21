const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync(__dirname + '/../../db/db.json')
const db = low(adapter)
 

// Set some defaults
db.defaults({
  "recipes": [

  ]
})
  .write()


// Read json and add to database
module.exports.read = function(data) {
  db.get("recipes")
    .push(data)
    .write()
  console.log("Added json to db")
}

// Search id and return contents
module.exports.search = function(data) {
  return db.get("recipes")
           .find({"title": data})
           .value()
}

// Delete entry
module.exports.delete = function(data) {
  db.get("recipes")
    .remove({"title": data})
    .write()
}

/*
// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
*/