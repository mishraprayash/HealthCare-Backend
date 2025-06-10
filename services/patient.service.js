
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

    async findOne(user, patientId) {
        try {
            const patient = await db.Patient.findOne({
                where: {
                    id: patientId,
                    userId: user.id
                }
            });
            if (!patient) {
                throw new Error('Patient doesnot exist');
            }
            return patient;
        } catch (error) {
            console.log("Error while finding a patient", error.message);
            throw error;
        }
    }

    async updateOne(user, patientData, patientId) {
        try {
            const patient = await db.Patient.findOne({
                where: {
                    id: patientId,
                    userId: user.id
                }
            });
            if (!patient) {
                throw new Error('Patient Doesnot exist');
            }
            patient.set({
                ...patientData
            })
            await patient.save();
            return patient;
        } catch (error) {
            console.log('Error while updating patient information', error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    async deleteOne(user, patientId) {
        try {
            const patient = await db.Patient.findOne({
                where: {
                    id: patientId,
                    userId: user.id
                }
            });
            if (!patient) {
                throw new Error("Patient doesnot exist");
            }
            await patient.destroy();
            // return patient;
        } catch (error) {
            console.log('Error while deleting a patient', error.message);
            throw error;
        }
    }
}