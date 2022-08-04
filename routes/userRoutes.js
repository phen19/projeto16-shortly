import {Router} from "express"
import { signUpUser, signInUser } from "../controllers/usersController.js";
import { validateSignIn, validateUser } from "../middleware/userMiddleware.js";


const router = Router();

router.post("/signup", validateUser,signUpUser);
router.post("/signin", validateSignIn ,signInUser);

export default router