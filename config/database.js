import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || 'healthcare_backend_dev',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // turn on for SQL debugging
  }
);

export default sequelize
