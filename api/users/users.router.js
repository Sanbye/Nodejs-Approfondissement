const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);
router.get("/:userId/articles", usersController.getAllArticlesByUserId);

module.exports = router;
