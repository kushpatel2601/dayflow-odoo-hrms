import express from "express";
import { addEmployee } from "../controllers/employeeController";
// Assuming you have middleware to ensure only HR can access this


const router = express.Router();

// POST /api/employees/add
router.post("/add", addEmployee);

export default router;