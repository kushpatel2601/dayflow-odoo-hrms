// models/Employee.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  loginId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  company: { type: String },
  department: { type: String },
  manager: { type: String },
  location: { type: String },
  skills: [String],
  certifications: [String],
  resume: String,
  privateInfo: String,
  salaryInfo: String,
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
