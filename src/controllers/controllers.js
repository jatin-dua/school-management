import { validationResult } from "express-validator";
import { School } from "../models/School.js";

export async function listSchools(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const schools = await School.list(req.query.lat, req.query.lng);
    res.json(schools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching schools" });
  }
}

export async function addSchool(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  
  try {
    const id = await School.add(req.body);
    res.status(201).json({ message: "School added", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding school" });
  }
}
