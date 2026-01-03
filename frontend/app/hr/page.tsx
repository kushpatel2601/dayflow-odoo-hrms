"use client"

import { AvatarMenu } from "@/app/component/AvatarMenu"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Status = "present" | "absent" | "leave"

const initialEmployees: {
  id: string
  name: string
  status: Status
  role: string
}[] = [
  { id: "1", name: "Aarav Shah", status: "present", role: "Backend Developer" },
  { id: "2", name: "Priyank Garala", status: "absent", role: "Frontend Developer" },
  { id: "3", name: "Neha Patel", status: "leave", role: "HR Executive" },
]

export default function EmployeesPage() {
  const router = useRouter()

  // State for the main Header button
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  // State for the list of employees to allow individual updates
  const [employees, setEmployees] = useState(initialEmployees)

  // Handler to toggle an individual employee's status
  const toggleEmployeeStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const newStatus: Status = emp.status === "present" ? "absent" : "present"
          return { ...emp, status: newStatus }
        }
        return emp
      })
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between px-8 py-5">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
            <p className="text-sm text-slate-500">
              Attendance overview & employee management
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            {/* 1. NEW EMPLOYEE BUTTON (Styled & Moved Here) */}
            <button
              onClick={() => router.push("/hr/newemployee")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            >
              <PlusIcon />
              <span>Add Employee</span>
            </button>

            {/* 2. DYNAMIC CHECK-IN BUTTON */}
            <button
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg active:scale-95 ${
                isCheckedIn
                  ? "bg-red-500 hover:bg-red-600" // Red (Check Out)
                  : "bg-emerald-500 hover:bg-emerald-600" // Green (Check In)
              }`}
            >
              {isCheckedIn ? "🛑 Check Out" : "⏱ Check In"}
            </button>

            <AvatarMenu />
          </div>
        </div>
      </header>

      {/* LEGEND */}
      <div className="mx-8 mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-slate-700">
          Attendance Indicators
        </h3>
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <LegendItem icon={<GreenDot />} text="Present (Click dot to toggle)" />
          <LegendItem icon={<span>✈️</span>} text="On Leave" />
          <LegendItem icon={<YellowDot />} text="Absent" />
        </div>
      </div>

      {/* GRID */}
      <main className="p-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="relative rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* INTERACTIVE STATUS SYMBOL */}
              <div 
                className="absolute top-5 right-5 cursor-pointer p-2 transition hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation() 
                  toggleEmployeeStatus(emp.id)
                }}
              >
                <AttendanceSymbol status={emp.status} />
              </div>

              {/* CARD CONTENT */}
              <div 
                className="cursor-pointer"
                onClick={() => router.push(`/hr/${emp.id}`)}
              >
                {/* AVATAR */}
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl text-white shadow">
                  👤
                </div>

                {/* INFO */}
                <h2 className="text-lg font-semibold text-slate-800">
                  {emp.name}
                </h2>
                <p className="text-sm text-slate-500">{emp.role}</p>

                <p className="mt-6 text-xs font-medium text-indigo-500">
                  View Profile →
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

/* ---------------- ICONS ---------------- */

function PlusIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor" 
      className="h-4 w-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

/* ---------------- ATTENDANCE SYMBOL ---------------- */

function AttendanceSymbol({ status }: { status: Status }) {
  if (status === "present") return <GreenDot />
  if (status === "leave") return <span className="text-xl">✈️</span>
  return <YellowDot />
}

/* ---------------- DOTS ---------------- */

function GreenDot() {
  return <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
}

function YellowDot() {
  return <span className="inline-block h-3 w-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-200" />
}

/* ---------------- LEGEND ITEM ---------------- */

function LegendItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  )
}