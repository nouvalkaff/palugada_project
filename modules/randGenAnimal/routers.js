const { Router } = require("express");
const router = Router();
const { genAnimal } = require("./controllers");

router.get("/generate", genAnimal);

module.exports = router;
