// Handlebars -- replace html content with values from JSON database

const Handlebars = require("handlebars")

var source = `
  {{#each recipes}}
    Name: {{name}} {{lastName}}<br>
  {{/each}}
`
var template = Handlebars.compile(source)
var data = {
  "recipes": [
    {
      "name": "test",
      "lastName": "test"
    },
    {
      "name": "test",
      "lastName": "test"
    }
  ]
}

var result = template(data)
console.log(result)