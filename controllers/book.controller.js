const Book = require("../models/book");

function index(req, res) {
  Book.find((err, books) => {
    if (err) return res.status(400).send({ error: "database failure" });
    res.json(books);
  });
}

function read(req, res) {
  Book.findOne({ _id: req.params.book_id }, (err, book) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(book);
  });
}

function readAuthor(req, res) {
  Book.findOne({ author: req.params.author }, (err, book) => {
    if (err) return res.status(400).send({ error: "Bad request" });
    res.json(book);
  });
}

function create(req, res) {
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
}

function update(req, res) {
  Book.findByIdAndUpdate(
    req.params.book_id,
    { $set: req.body },
    function (err) {
      if (err) return res.status(500).json({ error: "database failure" });
      res.json({ message: "book updated" });
    }
  );
}

function destroy(req, res) {
  Book.findByIdAndRemove(req.params.book_id, function (err) {
    if (err) return res.status(500).json({ error: "database failure" });
    res.json({ message: "book deleted" });
  });
}

module.exports = {
  index: index,
  read: read,
  create: create,
  update: update,
  destroy: destroy,
  readAuthor: readAuthor
};
