const express = require("express");
const router = express.Router();

const books = require("./books");
const posts = require("./posts");

router.use("/books", books);
router.use("/posts", posts);

module.exports = router;
