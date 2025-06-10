import { sendOKResponse, sendErrorResponse } from "../lib/responseHelper.js";

export class PatientToDoctorMapController {

    constructor(patientToDoctorMappingService) {
        this.patientToDoctorMappingService = patientToDoctorMappingService
    }

    async assignDoctor(req, res) {
        try {
            const { user } = req;
            const patientToDoctorMap = await this.patientToDoctorMappingService.assign(user, req.body)
            return sendOKResponse(res, 200, "Successfully assigned a doctor", patientToDoctorMap)

        } catch (error) {
            console.error(error);
            if (error.message) {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
    async getAllMappings(req, res) {
        try {
            const { user } = req;
            const allMappings = await this.patientToDoctorMappingService.findAllMappings(user);
            return sendOKResponse(res, 200, "Fetched all mappings", allMappings);
        } catch (error) {
            console.error(error);
            if (error.message) {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }

    }
    async getDoctorsForPatient(req, res) {
        try {
            const { user } = req;
            const { patientId } = req.params
            const doctors = await this.patientToDoctorMappingService.findAllDoctors(user, patientId);
            return sendOKResponse(res, 200, "Fetched all doctors for patient", doctors);
        } catch (error) {
            console.error(error);
            if (error.message) {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }

    }
    async removeDoctorForPatient(req, res) {
        try {
            const { user } = req;
            const doctorId = req.params.id;
            const { patientId } = req.body;
            await this.patientToDoctorMappingService.removeDoctor(user, patientId, doctorId);
            return sendOKResponse(res, 200, "Doctor Removed Successfully");
        } catch (error) {
            console.error(error);
            if (error.message) {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }

}