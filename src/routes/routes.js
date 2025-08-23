import { Router } from "express";
import { School } from "../models/School.js";

const router = Router();

router.get("/listSchools", async (req, res) => {
  try {
    const schools = await School.list(req.query.lat, req.query.lng);
    res.json(schools);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching schools" });
  }
});

router.post("/addSchool", async (req, res) => {
  try {
    const id = await School.add(req.body);
    res.status(201).json({ message: "School added", id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding school" });
  }
});

export default router;