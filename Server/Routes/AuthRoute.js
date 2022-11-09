import express from "express";
import { loginUser, registerUser ,checkUser} from "../Controllers/AuthController.js";

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/check', checkUser)



export default router