import axios, { AxiosInstance, AxiosError } from 'axios'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // IMPORTANT: allows cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ----------------------------
   Global Response Interceptor
----------------------------- */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login if unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api