import { Router } from "express";
import { pool } from "../config/db.js";

const router = Router();

// Define routes
router.get('/listSchools', (req, res) => {
  res.send('List of schools');
});

router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({ id: result.insertId, name, address, latitude, longitude });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding school" });
  }
});

export default router;