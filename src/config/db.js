import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create table if not exists
export async function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL,
      geohash VARCHAR(12),
      INDEX(geohash)        
    )
  `;
  const conn = await pool.getConnection();
  await conn.query(createTableQuery);
  conn.release();
  console.log("✅ School table ready");
}