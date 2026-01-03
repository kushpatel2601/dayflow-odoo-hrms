"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/24/outline" // Ensure you have heroicons or use an SVG

export default function NewEmployeePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "", // Initial login credential
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Retrieve token from storage (adjust based on your auth logic)
      const token = localStorage.getItem("token") 

      const res = await fetch("http://localhost:5000/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to create employee")
      }

      // Success! Redirect back to list
      router.push("/hr/employees")
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl">
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Employees
        </button>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Add New Employee</h1>
          <p className="mb-8 text-slate-500">Create a new account and login credentials.</p>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* NAME */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* EMAIL */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@company.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* ROLE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Job Role</label>
                <select
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select Role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="HR Executive">HR Executive</option>
                </select>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Initial Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Employee Account"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}