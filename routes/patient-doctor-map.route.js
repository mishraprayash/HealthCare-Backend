import { Router } from "express";
import { PatientToDoctorMapController } from "../controllers/patient-doctor-map.controller.js";
import { PatientToDoctorMapService } from "../services/patient-doctor-map.service.js";
import { validatePatientDoctorMap } from "../middleware/validation.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
import db from "../models/index.js"


const router = Router();

const mappingService = new PatientToDoctorMapService(db.PatientDoctorMapping);
const mappingController = new PatientToDoctorMapController(mappingService)

router.post('/', authMiddleware, validatePatientDoctorMap, (req, res) => mappingController.assignDoctor(req, res))
router.get('/', authMiddleware, (req, res) => mappingController.getAllMappings(req, res))
router.get('/:patientId', authMiddleware, (req, res) => mappingController.getDoctorsForPatient(req, res))
router.delete('/:id', authMiddleware, (req, res) => mappingController.removeDoctorForPatient(req, res))

export default router