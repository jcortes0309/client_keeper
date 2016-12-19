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
  // console.log("Request for clients received");

  db.clients.find().sort({first_name: 1}, function(error, docs) {
    if (error) {
      response.send(error);
    } else {
      // console.log("Sending data...");
      // console.log(docs);
      response.json(docs);
    }
  });
});

app.post("/clients", function(request, response) {
  // console.log("request sent by the front end", request.body);
  db.clients.insert(request.body, function(error, doc) {
    if (error) {
      response.send(error);
    } else {
      console.log("Client added...");
      console.log(doc);
      response.json(doc);
    }
  });
});

app.get("/clients/:id", function(request, response) {
  var id = request.params.id;
  console.log("ID of client to edit: ", id);

  db.clients.findOne({
    _id: mongojs.ObjectId(id)},
    function(error, doc) {
    if (error) {
      response.send(error);
    } else {
      response.json(doc);
    }
  });
});

app.put("/clients/:id", function(request, response) {
  var id = request.params.id;

  db.clients.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: {
      $set: {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        phone: request.body.phone
      }
    },
    new: true
  }, function (error, doc, lastErrorObject) {
    console.log("This is the doc that would be updated: ", doc);
    if (error) {
      response.send(error);
    } else {
      response.json(doc);
    }
  });

});


app.listen(3000);
console.log("Ready on port 3000");
