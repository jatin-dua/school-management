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

  list: async (latitude, longitude) => {
    const userGeohash = ngeohash.encode(latitude, longitude, 6);
    const neighbors = ngeohash.neighbors(userGeohash);

    const candidates = [userGeohash, ...neighbors];
    // console.log("Candidates: ", candidates);

    const [rows] = await pool.query(`SELECT id, name, latitude, longitude, geohash, 
        (6371 * 2 * ASIN(
        SQRT(
          POWER(SIN(RADIANS(? - latitude) / 2), 2) +
          COS(RADIANS(latitude)) * COS(RADIANS(?)) *
          POWER(SIN(RADIANS(? - longitude) / 2), 2)
        )
      )) AS distance_km FROM schools WHERE LEFT(geohash, 6) IN (?) ORDER BY distance_km ASC`, 
      [latitude, latitude, longitude, candidates]);
    return rows;
  }
};