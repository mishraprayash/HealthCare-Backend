import { sendOKResponse, sendErrorResponse } from "../lib/responseHelper.js";

export class PatientController {
    constructor(patientService) {
        this.patientService = patientService
    }
    async register(req, res) {
        try {
            const { user } = req;
            const patientData = req.body
            const patient = await this.patientService.create(user, patientData);
            return sendOKResponse(res, 201, "Patient added successfully", {
                id: patient.id,
                name: patient.name,
                email: patient.email
            });
        } catch (error) {
            if (error.message === "Patient already exists") {
                return sendErrorResponse(res, 409, error.message);
            }
            console.error("Patient Registration error:", error);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async getAllPatients(req, res) {
        try {

            const { user } = req;
            const patients = await this.patientService.findAll(user);
            return sendOKResponse(res, 200, "All Patients Fetched Successfully", patients)
        } catch (error) {
            console.error("All Patients Controller", error.message);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async getPatientInfo(req, res) {
        try {
            const { user } = req
            const patientId = req.params.id;
            const patient = await this.patientService.findOne(patientId);
            return sendOKResponse(res, 200, "Patient Fetched Successfully", patient)

        } catch (error) {
            console.error('Error fetching a patient info', error.message)
            if (error.message === "Patient doesnot exist") {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async updatePatient(req, res) {
        try {
            const patientId = req.params.id;
            const patientData = req.body;
            const patient = await this.patientService.updateOne(patientData, patientId);
            return sendOKResponse(res, 200, "Patient Updated Successfully", patient)

        } catch (error) {
            if (error.message === "Patient doesnot exist") {
                return sendErrorResponse(res, 400, error.message)
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
    async deletePatient(req, res) {
        try {
            const patientId = req.params.id;
            await this.patientService.deleteOne(patientId);
            return sendOKResponse(res, 200, "Patient Deleted Successfully")
        } catch (error) {
            if (error.message === "Patient doesnot exist") {
                return sendErrorResponse(res, 400, error.message)
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
}
