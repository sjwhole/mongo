const Post = require("../models/post");

function index(req, res) {
  Post.find((err, posts) => {
    if (err) return res.status(400).send({ error: "database failure" });
    res.json(posts);
  });
}

function read(req, res) {
  Post.findOne({ _id: req.params.post_id }, (err, post) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(post);
  });
}

function readAuthor(req, res) {
  Post.findOne({ author: req.params.author }, (err, post) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(post);
  });
}

function create(req, res) {
  var post = new Post();
  post.title = req.body.name;
  posts.body = req.body.body;
  post.author = req.body.author;

  post.save((err) => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
}

function update(req, res) {
  Post.findByIdAndUpdate(
    req.params.post_id,
    { $set: req.body },
    function (err) {
      if (err) return res.status(500).json({ error: "database failure" });
      res.json({ message: "post updated" });
    }
  );
}

function destroy(req, res) {
  Post.findByIdAndRemove(req.params.post_id, function (err) {
    if (err) return res.status(500).json({ error: "database failure" });
    res.json({ message: "post deleted" });
  });
}

module.exports = {
  index: index,
  read: read,
  create: create,
  update: update,
  destroy: destroy,
  readAuthor: readAuthor,
};
