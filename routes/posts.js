var express = require("express");
var router = express.Router();
var controller = require("../controllers/post.controller");

router.get("/", controller.index);

router.get("/:post_id", controller.read);

router.get("/author/:author", controller.readAuthor);

router.post("/", controller.create);

router.put("/:post_id", controller.update);

router.delete("/:post_id", controller.destroy);

module.exports = router;
