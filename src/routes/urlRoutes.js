import {Router} from "express"
import { deleteUrl, openShortUrl, shortenUrl } from "../controllers/urlsController.js";
import { verifyJWT } from "../middleware/userMiddleware.js";
import { getUrlById } from "../controllers/urlsController.js";
import { validateUrlDeletion, validateNewUrl } from "../middleware/urlsMiddleware.js";

const router = Router();

router.post("/urls/shorten", verifyJWT, validateNewUrl, shortenUrl)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openShortUrl)
router.delete("/urls/:id", verifyJWT, validateUrlDeletion,deleteUrl)

export default router