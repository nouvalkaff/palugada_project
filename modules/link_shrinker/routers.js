const { Router } = require("express");
const router = Router();
const { doItNow } = require("./controllers");

router.post("/doit", doItNow);

module.exports = router;
