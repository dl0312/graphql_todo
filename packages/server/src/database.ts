import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const pool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});
