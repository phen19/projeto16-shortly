import {Router} from "express"
import { openShortUrl, shortenUrl } from "../controllers/urlsController.js";
import { validateNewUrl, verifyJWT } from "../middleware/userMiddleware.js";
import { getUrlById } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", verifyJWT, validateNewUrl, shortenUrl)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openShortUrl)
router.delete("/urls/:id", verifyJWT)

export default router