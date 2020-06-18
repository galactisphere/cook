const json2html = require('node-json2html');

let template = {'<>':'div','html':'${title} ${year}'};
    
let data = [
    {"title":"Heat","year":"1995"},
    {"title":"Snatch","year":"2000"},
    {"title":"Up","year":"2009"},
    {"title":"Unforgiven","year":"1992"},
    {"title":"Amadeus","year":"1984"}
];
    
let html = json2html.transform(data,template);