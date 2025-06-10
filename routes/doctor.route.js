import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller.js";
import { DoctorService } from "../services/doctor.service.js";
import { validateDoctorRegister, validateUUIDParam } from "../middleware/validation.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

// Initialize router
const router = Router();

// Create service and controller instances
const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

// Define routes with validation middleware and arrow functions to preserve 'this' context
router.post('/', authMiddleware, validateDoctorRegister, (req, res) => doctorController.register(req, res));

router.get('/', authMiddleware, (req, res) => doctorController.getAllDoctors(req, res))

router.get('/:id', validateUUIDParam, authMiddleware, (req, res) => doctorController.getDoctorInfo(req, res))

router.put('/:id', validateUUIDParam, authMiddleware, validateDoctorRegister, (req, res) => doctorController.updateDoctor(req, res))

router.delete('/:id', validateUUIDParam, authMiddleware, (req, res) => doctorController.deleteDoctor(req, res))

export default router;