const { Router } = require("express");
const router = Router();
const { doItNow, redirectToRealURL } = require("./controllers");

router.post("/doit", doItNow);

router.get("/:id", redirectToRealURL);
// router.post("/doit", doItNow);

module.exports = router;
