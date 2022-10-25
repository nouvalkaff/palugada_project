const { Router } = require("express");
const router = Router();
const { doItNow, redirectToRealURL, getAllURLs } = require("./controllers");

router.post("/doit", doItNow);

router.get("/all", getAllURLs);

// redirect route must be at the very bottom
router.get("/:id", redirectToRealURL);

module.exports = router;
