import { Router } from "express";
import { PatientController } from "../controllers/patient.controller.js";
import { PatientService } from "../services/patient.service.js";
import { validatePatientRegister, validateUUIDParam } from "../middleware/validation.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
import db from "../models/index.js";

// Initialize router
const router = Router();

// Create service and controller instances
const patientService = new PatientService(db.Patient);
const patientController = new PatientController(patientService);

// Define routes with validation middleware and arrow functions to preserve 'this' context
router.post('/', authMiddleware, validatePatientRegister, (req, res) => patientController.register(req, res));

router.get('/', authMiddleware, (req, res) => patientController.getAllPatients(req, res))

router.get('/:id', validateUUIDParam, authMiddleware, (req, res) => patientController.getPatientInfo(req, res))

router.put('/:id', validateUUIDParam, authMiddleware, validatePatientRegister, (req, res) => patientController.updatePatient(req, res))

router.delete('/:id', validateUUIDParam, authMiddleware, (req, res) => patientController.deletePatient(req, res))

export default router;