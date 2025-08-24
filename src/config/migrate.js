import { pool } from "./db.js";

const runMigrations = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL,
      geohash VARCHAR(12),
      INDEX(geohash)        
    )`;
    await pool.query(createTableQuery);
    console.log("✅ Migration completed successfully.");
    process.exit(0);
    
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
};

runMigrations();
