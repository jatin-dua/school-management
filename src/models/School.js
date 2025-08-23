import { pool } from "../config/db.js"

export const School = {
  add: async ({ name, address, latitude, longitude }) => {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    return result.insertId;
  },

  list: async () => {
    const [rows] = await pool.execute("SELECT * FROM schools");
    return rows;
  }
};