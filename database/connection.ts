import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'mydb';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';


const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
      }
    //logging: false
});

export default database;