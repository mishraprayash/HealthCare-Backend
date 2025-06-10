
import db from "../models/index.js";

export class PatientService {

    async create(user, patientData) {
        try {
            const existingPatient = await db.Patient.findOne({
                where: {
                    email: patientData.email,
                    userId: user.id
                },
            })
            if (existingPatient) {
                throw new Error('Patient already exists');
            }
            const patient = await db.Patient.create(
                { userId: user.id, ...patientData }
            )
            return patient;
        } catch (error) {
            console.error("Error in patient creation:", error.message);
            throw error;
        }
    }

    async findAll(user) {
        try {
            const patients = await db.Patient.findAll({
                where: {
                    userId: user.id
                }
            })
            return patients;
        } catch (error) {
            console.error("Error in patient creation:", error.message);
            throw error;
        }
    }

    async findOne(patientId) {
        try {
            const patient = await db.Patient.findByPk(patientId);
            if (!patient) {
                throw new Error('Patient doesnot exist');
            }
            return patient;
        } catch (error) {
            console.log("Error while finding a patient", error.message);
            throw error;
        }
    }

    async updateOne(patientData, patientId) {
        try {
            const patient = await db.Patient.findByPk(patientId);
            if (!patient) {
                throw new Error('Patient Doesnot exist');
            }
            patient.set({
                ...patientData
            })
            await patient.save();
            return patient;
        } catch (error) {
            console.log('Error while updating patient information', error.message)
            throw error;
        }
    }
    
    async deleteOne(patientId) {
        try {
            const patient = await db.Patient.findByPk(patientId);
            if (!patient) {
                throw new Error('Patient Doesnot exist');
            }
            await patient.destroy();
            // return patient;
        } catch (error) {
            console.log('Error while deleting a patient', error.message);
            throw error;
        }
    }
}