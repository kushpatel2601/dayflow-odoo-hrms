"use client"

import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

export default function HrRegister() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    await axios.post("http://localhost:5000/api/hr/register", {
      companyName: form.companyName,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    })

    alert("HR Registered Successfully")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="border border-gray-700 p-8 rounded-xl w-[420px]">
        <h1 className="text-xl mb-6">HR Sign Up</h1>

        <Input label="Company Name" name="companyName" onChange={handleChange} />
        <Input label="Name" name="name" onChange={handleChange} />
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Phone" name="phone" onChange={handleChange} />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPass ? "text" : "password"}
            onChange={handleChange}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-8"
          >
            {showPass ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 w-full mt-6 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

function Input({ label, ...props }: any) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-gray-600 outline-none py-1"
      />
    </div>
  )
}
