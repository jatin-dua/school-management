import { pool } from "../config/db.js"
import ngeohash from "ngeohash";


export const School = {
  add: async ({ name, address, latitude, longitude }) => {
    const geohash = ngeohash.encode(latitude, longitude);

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude, geohash) VALUES (?, ?, ?, ?, ?)",
      [name, address, latitude, longitude, geohash]
    );
    return result.insertId;
  },

  list: async () => {
    const [rows] = await pool.execute("SELECT * FROM schools");
    return rows;
  }
};