'use client'

import { useRouter } from 'next/navigation'
import Nav from '@/app/component/nav'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        <h2 className="text-4xl md:text-5xl font-extrabold max-w-3xl">
          Every Workday, Perfectly Aligned
        </h2>

        <p className="mt-6 text-lg max-w-2xl text-indigo-100">
          Dayflow is a modern Human Resource Management System that simplifies
          employee attendance, leave management, payroll visibility, and HR
          approvals — all in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push('/register')}
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-indigo-600"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 bg-white text-gray-800 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose Dayflow?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Employee Management"
            description="Centralized employee profiles with role-based access and secure data handling."
          />
          <FeatureCard
            title="Attendance Tracking"
            description="Daily and weekly attendance views with smart check-in and check-out."
          />
          <FeatureCard
            title="Leave & Time-Off"
            description="Simple leave requests, real-time approvals, and automatic attendance updates."
          />
          <FeatureCard
            title="Payroll Visibility"
            description="Transparent, read-only salary access for employees with admin control."
          />
          <FeatureCard
            title="HR Dashboards"
            description="Powerful dashboards for HR to manage employees and approvals efficiently."
          />
          <FeatureCard
            title="Secure & Scalable"
            description="Built with modern tech and secure authentication for growing teams."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-indigo-200">
        © {new Date().getFullYear()} Dayflow HRMS. All rights reserved.
      </footer>
    </main>
  )
}

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
