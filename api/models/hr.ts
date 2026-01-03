import mongoose from "mongoose"

const HrSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "HR",
      enum: ["HR"]
    },
    logo: { type: String } // Cloudinary / S3 URL later
  },
  { timestamps: true }
)

export default mongoose.model("Hr", HrSchema)
