import { Router } from "express";
import { body, query } from "express-validator";
import { listSchools, addSchool } from "../controllers/controllers.js";

const router = Router();

router.get("/listSchools",
  [
    query("lat").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    query("lng").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
  ],
  listSchools
);

router.post("/addSchool",
  [
    body("name").isString().trim().isLength({ min: 1, max: 100}).withMessage("School name required"),
    body("address").isString().trim().isLength({ min: 1, max: 200}).withMessage("Address required"),
    body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
  ],
  addSchool
);

export default router;