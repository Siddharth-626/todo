
import exp from "express";
import { signup,login } from "../controler/auth_controler.js";
const router = exp.Router();

router.post('/signup',signup)
router.post('/login',login)
export default router