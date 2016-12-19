const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs("clientkeeper", ["clients"]);


// Set static folder
app.use(express.static(__dirname + "/public"));
// Use body-parser
app.use(bodyParser.json());

app.get("/clients", function(request, response) {
  console.log("Request for clients received");

  db.clients.find(function(error, docs) {
    if (error) {
      response.send(error);
    } else {
      console.log("Sending data...");
      console.log(docs);
      response.json(docs);
    }
  });
});



app.listen(3000);
console.log("Ready on port 3000");
