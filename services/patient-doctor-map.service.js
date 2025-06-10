import db from "../models/index.js";

export class PatientToDoctorMapService {

    constructor(patienttoDoctorDBModel) {
        this.mappingModel = patienttoDoctorDBModel
    }

    async assign(user, credentials) {
        try {
            const patient = await db.Patient.findOne({
                where: {
                    id: credentials.patientId,
                    userId: user.id
                }
            })
            if (!patient) {
                throw new Error("Patient doesnot exist");
            }
            const doctor = await db.Doctor.findOne({
                where: {
                    id: credentials.doctorId,
                    userId: user.id
                }
            })
            if (!doctor) {
                throw new Error("Doctor doesnot exist");
            }
            const patientToDoctorMap = await this.mappingModel.create({
                patientId: credentials.patientId,
                doctorId: credentials.doctorId,
                notes: credentials.notes
            })
            return patientToDoctorMap;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findAllMappings(user) {
        try {
            const allMappings = await db.PatientDoctorMapping.findAll({
                include: {
                    model: db.Patient,
                    as: 'patient',
                    where: {
                        userId: user.id
                    },
                    attributes: ['userId']
                }
            })
            return allMappings;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
    async findAllDoctors(user, patientId) {
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

            const doctors = await db.PatientDoctorMapping.findAll({
                where: {
                    patientId
                },
                include: {
                    model: db.Patient,
                    as: 'patient',
                    where: {
                        userId: user.id
                    },
                    attributes: ['userId']
                }
            })
            return doctors;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async removeDoctor(user, patientId, doctorId) {
        try {
            const doctor = await db.PatientDoctorMapping.findAll({
                where: {
                    doctorId,
                },
                include: {
                    model: db.Patient,
                    as: 'patient',
                    where: {
                        id: patientId,
                        userId: user.id
                    }

                }
            });
            if (!doctor.length) {
                throw new Error("Doctor doesnot exist");
            }
            await db.PatientDoctorMapping.destroy({
                where: {
                    doctorId,
                    patientId
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}