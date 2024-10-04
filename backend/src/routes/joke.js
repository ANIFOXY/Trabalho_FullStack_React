const express = require("express");

const JokeApi = require("../api/joke");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware(), JokeApi.findAllJokes);
router.get("/:id", authMiddleware(), JokeApi.findOneJoke);
router.post("/", authMiddleware(['admin']), JokeApi.createJoke);
router.put("/:id", authMiddleware(['admin']), JokeApi.updateJoke);
router.delete("/:id", authMiddleware(['admin']), JokeApi.deleteJoke);

module.exports = router;