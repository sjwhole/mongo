var express = require("express");
var router = express.Router();
var Post = require("../models/post");

router.get("/", function (req, res) {
  Post.find((err, posts) => {
    if (err) return res.status(400).send({ error: "database failure" });
    res.json(posts);
  });
});

router.get("/:post_id", function (req, res) {
  Post.findOne({ _id: req.params.post_id }, (err, posts) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(posts);
  });
});

router.get("/author/:author", function (req, res) {
  Post.findOne({ author: req.params.author }, (err, posts) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(posts);
  });
});

router.post("/", function (req, res) {
  var posts = new Post();
  posts.title = req.body.name;
  posts.body = req.body.body;
  posts.author = req.body.author;

  posts.save((err) => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

router.put("/:post_id", function (req, res) {
  Post.findByIdAndUpdate(
    req.params.post_id,
    { $set: req.body },
    function (err) {
      if (err) return res.status(500).json({ error: "database failure" });
      res.json({ message: "posts updated" });
    }
  );
});

router.delete("/:post_id", function (req, res) {
  Post.findByIdAndRemove(req.params.post_id, function (err) {
    if (err) return res.status(500).json({ error: "database failure" });
    res.json({ message: "posts deleted" });
  });
});

module.exports = router;
