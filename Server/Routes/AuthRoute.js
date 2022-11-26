import express from "express";
import { loginUser, registerUser ,checkUser, userUnblock, userBlock} from "../Controllers/AuthController.js";

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/check', checkUser)
router.put('/unblock',userUnblock)
router.put('/block',userBlock)

export default router