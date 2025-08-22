import { Router } from "express";
const router = Router();

// Define routes
router.get('/listSchools', (req, res) => {
  res.send('List of schools');
});

router.post('/addSchool', (req, res) => {
  res.send('Add a new school');
});

export default router;