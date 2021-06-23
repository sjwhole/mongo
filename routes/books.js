var express = require("express");
var router = express.Router();
var Book = require("../models/book");

router.get("/", function (req, res) {
  Book.find((err, books) => {
    if (err) return res.status(400).send({ error: "database failure" });
    res.json(books);
  });
});

router.get("/:book_id", function (req, res) {
  Book.findOne({ _id: req.params.book_id }, (err, book) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(book);
  });
});

router.get("/author/:author", function (req, res) {
  Book.findOne({ author: req.params.author }, (err, book) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(book);
  });
});

router.post("/", function (req, res) {
  var book = new Book();
  book.title = req.body.name;
  book.author = req.body.author;
  book.published_date = new Date(req.body.published_date);

  book.save((err) => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

router.put("/:book_id", function (req, res) {
  Book.findByIdAndUpdate(
    req.params.book_id,
    { $set: req.body },
    function (err) {
      if (err) return res.status(500).json({ error: "database failure" });
      res.json({ message: "book updated" });
    }
  );
});

router.delete("/:book_id", function (req, res) {
  Book.findByIdAndRemove(req.params.book_id, function (err) {
    if (err) return res.status(500).json({ error: "database failure" });
    res.json({ message: "book deleted" });
  });
});

module.exports = router;
