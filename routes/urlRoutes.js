import {Router} from "express"
import { shortenUrl } from "../controllers/urlsController.js";
import { validateNewUrl, verifyJWT } from "../middleware/userMiddleware.js";

const router = Router();

router.post("/urls/shorten", verifyJWT, validateNewUrl, shortenUrl)

export default router