
export class DoctorService {

    constructor(doctorDBModel){
        this.Doctor = doctorDBModel;
    }

    async create(user, doctorData) {
        try {
            const existingDoctor = await this.Doctor.findOne({
                where: {
                    email: doctorData.email,
                    userId: user.id
                },
            })
            if (existingDoctor) {
                throw new Error('Doctor already exists');
            }
            const doctor = await this.Doctor.create(
                { userId: user.id, ...doctorData }
            )
            return doctor;
        } catch (error) {
            console.error("Error in doctor creation:", error.message);
            throw error;
        }
    }

    async findAll(user) {
        try {
            const doctors = await this.Doctor.findAll({
                where: {
                    userId: user.id
                }
            })
            return doctors;
        } catch (error) {
            console.error("Error in doctor creation:", error.message);
            throw error;
        }
    }

    async findOne(user, doctorId) {
        try {
            const doctor = await this.Doctor.findOne({
                where: {
                    id: doctorId,
                    userId: user.id
                }
            });
            if (!doctor) {
                throw new Error('Doctor doesnot exist');
            }
            return doctor;
        } catch (error) {
            console.log("Error while finding a doctor", error.message);
            throw error;
        }
    }

    async updateOne(user, doctorData, doctorId) {
        try {
            const doctor = await this.Doctor.findOne({
                where: {
                    id: doctorId,
                    userId: user.id
                }
            });
            if (!doctor) {
                throw new Error('Doctor doesnot exist');
            }
            doctor.set({
                ...doctorData
            })
            await doctor.save();
            return doctor;
        } catch (error) {
            console.log('Error while updating doctor information', error);
             if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    async deleteOne(user, doctorId) {
        try {
            const doctor = await this.Doctor.findOne({
                where: {
                    id: doctorId,
                    userId: user.id
                }
            });
            if (!doctor) {
                throw new Error('Doctor Doesnot exist');
            }
            await doctor.destroy();
        } catch (error) {
            console.log('Error while deleting a doctor', error.message);
            throw error;
        }
    }
}