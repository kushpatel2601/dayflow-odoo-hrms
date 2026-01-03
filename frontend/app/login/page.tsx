// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import api from '@/lib/api'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const res = await api.post('/auth/login', {
//         email,
//         password,
//       })

//       // Example: role-based redirect
//       if (res.data.role === 'HR') {
//         router.push('/hr/dashboard')
//       } else {
//         router.push('/employee/dashboard')
//       }
//     } catch (err: any) {
//       setError('Invalid email or password')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        
//         <h1 className="text-2xl font-bold text-indigo-700 mb-2">
//           Welcome Back
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Login to continue to Dayflow
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Don’t have an account?{' '}
//           <span
//             onClick={() => router.push('/register')}
//             className="text-indigo-600 cursor-pointer font-medium"
//           >
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function HrLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/hr/login",
        { email, password }
      )

      // ✅ Save token & HR info
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("hr", JSON.stringify(res.data.hr))

      // ✅ Redirect to admin dashboard
      router.push("/hr")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          HR Login
        </h1>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 rounded outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
