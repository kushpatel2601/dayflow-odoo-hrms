"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Hr = {
  id: string
  name: string
  email: string
  companyName: string
  role: string
  avatar?: string
}

export default function MyProfilePage() {
  const [hr, setHr] = useState<Hr | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  /* ---------------- FETCH PROFILE FROM DB ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch("http://localhost:5000/api/hr/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) throw new Error("Unauthorized")

        const data = await res.json()
        setHr(data.hr)
      } catch (err) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    )
  }

  if (!hr) return null

  /* ---------------- SAVE CHANGES TO DB ---------------- */
  const handleSave = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch(
      "http://localhost:5000/api/hr/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: hr.name,
          avatar: hr.avatar
        })
      }
    )

    if (res.ok) {
      const data = await res.json()
      setHr(data.hr) // fresh DB data
      setIsEditing(false)
    }
  }

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setHr({ ...hr, avatar: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        {/* BACK */}
        <button
          onClick={() => router.push("/hr/employees")}
          className="mb-6 text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="mb-8 text-2xl font-bold text-slate-800">
          My Profile
        </h1>

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={hr.avatar || "/avatar-placeholder.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border"
            />

            {isEditing && (
              <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-600 p-1 text-xs text-white">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          <div>
            {isEditing ? (
              <input
                value={hr.name}
                onChange={(e) =>
                  setHr({ ...hr, name: e.target.value })
                }
                className="rounded border px-3 py-1 text-lg font-semibold"
              />
            ) : (
              <h2 className="text-xl font-semibold text-slate-800">
                {hr.name}
              </h2>
            )}
            <p className="text-slate-500">{hr.role}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          <ProfileItem label="Email" value={hr.email} />
          <ProfileItem label="Company" value={hr.companyName} />
          <ProfileItem label="Role" value={hr.role} />
          <ProfileItem label="User ID" value={hr.id} />
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg border px-5 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProfileItem({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  )
}