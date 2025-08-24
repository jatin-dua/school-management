import { Router } from "express";
import { School } from "../models/School.js";
import { body, query, validationResult } from "express-validator";

const router = Router();

router.get("/listSchools",
  [
    query("lat").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    query("lng").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const schools = await School.list(req.query.lat, req.query.lng);
    res.json(schools);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching schools" });
  }
});

router.post("/addSchool",
  [
    body("name").isString().trim().notEmpty().withMessage("School name required"),
    body("address").isString().trim().notEmpty().withMessage("Address required"),
    body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const id = await School.add(req.body);
    res.status(201).json({ message: "School added", id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding school" });
  }
});

export default router;