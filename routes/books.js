var express = require("express");
var router = express.Router();
var controller = require("../controllers/book.controller");

router.get("/", controller.index);

router.get("/:book_id", controller.read);

router.get("/author/:author", controller.readAuthor);

router.post("/", controller.create);

router.put("/:book_id", controller.update);

router.delete("/:book_id", controller.destroy);

module.exports = router;
