import { Router } from "express";
const router = Router();
import { doItNow } from "./controllers.js";

router.post("/doit", doItNow);

export default router;
