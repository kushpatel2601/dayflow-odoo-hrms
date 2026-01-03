'use client'

import { useRouter } from 'next/navigation'

export default function Nav() {
    const router = useRouter()

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold"><a href="./">Dayflow</a></h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/auth/hr-register')}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  )
}

