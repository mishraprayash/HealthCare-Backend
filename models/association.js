
export const applyAssociations = ({ User, Patient, Doctor, PatientDoctorMapping }) => {

  Patient.belongsToMany(Doctor, {
    through: PatientDoctorMapping,
    foreignKey: 'patientId',
    otherKey: 'doctorId',
    as: 'doctors',
    onDelete: 'CASCADE',
  });

  Doctor.belongsToMany(Patient, {
    through: PatientDoctorMapping,
    foreignKey: 'doctorId',
    otherKey: 'patientId',
    as: 'patients',
    onDelete: 'CASCADE',
  });

  PatientDoctorMapping.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient'
  });

  PatientDoctorMapping.belongsTo(Doctor, {
    foreignKey: 'doctorId',
    as: 'doctor'
  });

  // One-to-Many: User -> Patient
  User.hasMany(Patient, {
    foreignKey: 'userId',
    as: 'patients',
    onDelete: 'CASCADE',
  });

  Patient.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // One-to-Many: User -> Doctor
  User.hasMany(Doctor, {
    foreignKey: 'userId',
    as: 'doctors',
    onDelete: 'CASCADE',
  });

  Doctor.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

};
