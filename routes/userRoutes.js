import {Router} from "express"
import { signUpUser } from "../controllers/usersController.js";
import { validateUser } from "../middleware/userMiddleware.js";


const router = Router();

router.post("/signup", validateUser,signUpUser);


export default router