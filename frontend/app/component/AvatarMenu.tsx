"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function AvatarMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const logout = () => {
    localStorage.clear()
    router.push("/login")
  }

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow rounded w-40">
          <button
            onClick={() => router.push("/hr/employees/myprofile")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            My Profile
          </button>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
