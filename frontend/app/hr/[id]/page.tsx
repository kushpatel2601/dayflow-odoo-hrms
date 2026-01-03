"use client"

import { useParams, useRouter } from "next/navigation"

export default function EmployeeProfile() {
  const { id } = useParams()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-purple-600"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold">Employee #{id}</h2>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Info label="Email" value="employee@company.com" />
          <Info label="Phone" value="+91 99999 99999" />
          <Info label="Department" value="Engineering" />
          <Info label="Status" value="Present" />
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
