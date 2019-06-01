/* 

PORT ABOVE 1024 ONLY
*/
//Non-privileged user (not root) can't open a listening socket on ports below 1024.


var express = require('express');
var app = express();

//For Post data
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
// support encoded bodies
/*
If extended is false, you can not post "nested object"

person[name] = 'cw'

// Nested Object = { person: { name: cw } }
If extended is true, you can do whatever way that you like.
*/
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");

   var page = `
      <h1>Hello World</h1>
  
      <hr>
      <form method = "POST" action = "http://localhost:8081/somepage">
      <input type = text name = myname value = "Nikhil">
         <input type = "Submit" value = "POST Request">
      </form>
      <hr>
      <hr>
      <a href = "http://localhost:8081/abxcd">abxcd</a>
   `;
  
   res.send(page);
  // res.send('Hello GET');
})



// This responds a POST request for the homepage
app.post('/somepage', function (req, res) {
    console.log("Got a POST request for the somepage");
    var myname = req.body.myname;
 
    res.send('Hello '+myname+' in POST Data!');
 })
 
 
  
// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

//server.listen(process.env.PORT || 5000);

var server = app.listen(process.env.PORT || 5000, function () {

   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})