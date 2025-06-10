import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { validateUserLogin, validateUserRegister } from "../middleware/validation.js";

// Initialize router
const router = Router();

// Create service and controller instances
const authService = new AuthService();
const authController = new AuthController(authService);

// Define routes with validation middleware and arrow functions to preserve 'this' context
router.post('/register', validateUserRegister, (req, res) => authController.register(req, res));
router.post('/login', validateUserLogin, (req, res) => authController.login(req, res));

export default router;