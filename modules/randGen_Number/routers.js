const { Router } = require("express");
const router = Router();
const { genNumber } = require("./controllers");

router.get("/generate", genNumber);

module.exports = router;
