
import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Patient = sequelize.define('Patients', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }

  },
  age: DataTypes.INTEGER,
  gender: DataTypes.STRING,
  condition: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'patients',
  timestamps: true,
});
