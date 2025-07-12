import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'


const axiosSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

// Store token until ready
let accessToken = null
let waitForTokenResolve
const waitForToken = new Promise((resolve) => {
  waitForTokenResolve = resolve
})

const useAxiosSecure = () => {
  const { user, logoutUser, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Step 1: When token becomes available, mark it
    if (!loading && user?.accessToken) {
      accessToken = user.accessToken
      waitForTokenResolve() //resolve the token-waiting promise
    }
  }, [user?.accessToken, loading])

  useEffect(() => {
    // Step 2: Add interceptors

    const requestInterceptor = axiosSecureInstance.interceptors.request.use(
      async (config) => {
        if (!accessToken) {
          await waitForToken 
        }

        config.headers.Authorization = `Bearer ${accessToken}`
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseInterceptor = axiosSecureInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logoutUser()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosSecureInstance.interceptors.request.eject(requestInterceptor)
      axiosSecureInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [logoutUser, navigate])

  return axiosSecureInstance
}

export default useAxiosSecure
