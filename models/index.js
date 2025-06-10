import sequelize from '../config/database.js';
import { User } from "./user.js"
import { Patient } from './patient.js';
import { Doctor } from './doctor.js';
import { PatientDoctorMapping } from './PatientDoctorMapping.js';
import { applyAssociations } from "./association.js";

applyAssociations({ User,Patient, Doctor, PatientDoctorMapping });

const db = {
    sequelize,
    Sequelize: sequelize.Sequelize,
    User,
    Patient,
    Doctor,
    PatientDoctorMapping,
};

export default db;
