var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  author: String,
});

module.exports = mongoose.model("post", postSchema);
