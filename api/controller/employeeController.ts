import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Employee from "../models/employee";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // 1. Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new employee
    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Employee account created successfully",
      employeeId: newEmployee._id
    });

  } catch (error) {
    console.error("Add Employee Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};