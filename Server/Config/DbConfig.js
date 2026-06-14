import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create database connection pool
const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 10,
});

export default dbConnection.promise();
