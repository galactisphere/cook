const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db/db.json')
const db = low(adapter)
 

// Set some defaults
db.defaults({
  "recipes": [

  ]
})
  .write()

module.exports.add = function(data) {
  /*
  db.get('recipes')
    .push(data)
    .write()
  */
  db.set("", "you")
    .write()
  console.log(" you")
}

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

// Delete the entire database
/*
module.exports.purge = function(data) {
  db.get("recipes")
    .remove()
    .write()
}
*/

/*
// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
*/