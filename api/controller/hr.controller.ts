import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Hr from "../models/hr"

export const registerHr = async (req: Request, res: Response) => {
  try {
    const { companyName, name, email, phone, password } = req.body

    const exists = await Hr.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "HR already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const hr = await Hr.create({
      companyName,
      name,
      email,
      phone,
      password: hashedPassword
    })

    res.status(201).json({
      success: true,
      message: "HR registered successfully"
    })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

export const loginHr = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const hr = await Hr.findOne({ email })
    if (!hr) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, hr.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      { id: hr._id, role: hr.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    // ✅ RETURN HR OBJECT (WITHOUT PASSWORD)
    res.status(200).json({
      success: true,
      token,
      hr: {
        id: hr._id,
        name: hr.name,
        email: hr.email,
        companyName: hr.companyName,
        role: hr.role
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}


// profileHr
export const profileHr = async (req: Request, res: Response) => {
  try {
    // 1. Get the User ID
    // Ideally, this comes from your auth middleware (e.g., req.user.id)
    // If you don't have middleware yet, you might be passing it in the body (not recommended for production)
    const userId = (req as any).user?.id || req.body.id

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: User ID not found" 
      })
    }

    // 2. Get the fields to update from the body
    const { name, profilePic } = req.body

    // 3. Construct the update object (only update what is provided)
    const updateData: any = {}
    if (name) updateData.name = name
    if (profilePic) updateData.profilePic = profilePic

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No update data provided" 
      })
    }

    // 4. Update the HR document
    const updatedHr = await Hr.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password")

    if (!updatedHr) {
      return res.status(404).json({ 
        success: false, 
        message: "HR profile not found" 
      })
    }

    // 5. Send success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      hr: {
        id: updatedHr._id,
        name: updatedHr.name,
        email: updatedHr.email,
        companyName: updatedHr.companyName,
        role: updatedHr.role,
        profilePic: updatedHr.profilePic // Ensure your Mongoose model has this field
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating profile" 
    })
  }
}