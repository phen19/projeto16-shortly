import {Router} from "express"
import { signUpUser, signInUser, getUrlsByUser, getRanking } from "../controllers/usersController.js";
import { validateSignIn, validateUser, verifyJWT } from "../middleware/userMiddleware.js";


const router = Router();

router.post("/signup", validateUser,signUpUser);
router.post("/signin", validateSignIn ,signInUser);
router.get("/users/me", verifyJWT, getUrlsByUser);
router.get("/ranking", getRanking)

export default router