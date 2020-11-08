const request = require('request');
const express = require('express');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let app = express();
var elements = ["h1", "a", "image"];

app.get('/getStyles', function (req, res) {
    let url = req.query.url;
    let styleResponse = {};
    request(url, (error, response, html) => {
        const dom = new JSDOM(html);

        for(var i = 0; i < elements.length; i++){
            var currentElement = dom.window.document.querySelector(elements[i]);
            
            if(currentElement != null){
                styleResponse[elements[i]] = dom.window.getComputedStyle(currentElement);
            }   
        }
        res.send(styleResponse)
    });
    
})
 
let server = app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});
