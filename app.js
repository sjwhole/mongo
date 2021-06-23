var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/mongodb_tutorial");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require("./routes");
app.use("/", router);

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
});
