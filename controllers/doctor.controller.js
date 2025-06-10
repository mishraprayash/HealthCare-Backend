import { sendOKResponse, sendErrorResponse } from "../lib/responseHelper.js";

export class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService
    }
    async register(req, res) {
        try {
            const { user } = req;
            const doctorData = req.body
            const doctor = await this.doctorService.create(user, doctorData);
            return sendOKResponse(res, 201, "Doctor added successfully", {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email
            });
        } catch (error) {
            if (error.message === "Doctor already exists") {
                return sendErrorResponse(res, 409, error.message);
            }
            console.error("Doctor Registration error:", error);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async getAllDoctors(req, res) {
        try {

            const { user } = req;
            const doctors = await this.doctorService.findAll(user);
            return sendOKResponse(res, 200, "All Doctors Fetched Successfully", doctors)
        } catch (error) {
            console.error("All Doctors Controller", error.message);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async getDoctorInfo(req, res) {
        try {
            const { user } = req
            const doctorId = req.params.id;
            const doctor = await this.doctorService.findOne(user, doctorId);
            return sendOKResponse(res, 200, "Doctor Fetched Successfully", doctor)

        } catch (error) {
            console.error('Error fetching a doctor info', error.message)
            if (error.message === "Doctor doesnot exist") {
                return sendErrorResponse(res, 400, error.message);
            }
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }

    async updateDoctor(req, res) {
        try {
            const { user } = req;
            const doctorId = req.params.id;
            const doctorData = req.body;
            const doctor = await this.doctorService.updateOne(user, doctorData, doctorId);
            return sendOKResponse(res, 200, "Doctor Updated Successfully", doctor)

        } catch (error) {
            if (error.message === "Doctor doesnot exist") {
                return sendErrorResponse(res, 400, error.message)
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
    async deleteDoctor(req, res) {
        try {
            const {user} = req;
            const doctorId = req.params.id;
            await this.doctorService.deleteOne(user,doctorId);
            return sendOKResponse(res, 200, "Doctor Deleted Successfully")
        } catch (error) {
            if (error.message === "Doctor doesnot exist") {
                return sendErrorResponse(res, 400, error.message)
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
}
