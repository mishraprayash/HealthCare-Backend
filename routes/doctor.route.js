import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.route('/register',authController.register)
router.route('/login',authController.login)

export default router