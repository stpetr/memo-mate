import axios from 'axios'

import { useAuthStore } from 'store/useAuthStore'
import { API_URL, AUTH_TOKEN_KEY } from 'store/constants'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((request) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status === 401) {
    useAuthStore.getState().setUnauthenticated()
    return null
  }
  return error.response
})

export default api
