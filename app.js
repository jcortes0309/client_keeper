const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongojs = require('mongojs');


// Set static folder
app.use(express.static(__dirname + "/public"));
// Use body-parser
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.send("It works!");
});



app.listen(3000);
console.log("Ready on port 3000");
