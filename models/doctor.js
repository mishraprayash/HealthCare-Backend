import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Doctor = sequelize.define('Doctors', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: DataTypes.STRING,
  
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'doctors',
  timestamps: true,
});
