import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 90_000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().sesion?.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    const sesion = useAuthStore.getState().sesion
    if (sesion && error.config?.headers.Authorization === `Bearer ${sesion.token}`) {
      useAuthStore.getState().cerrarSesion()
    }
  }
  return Promise.reject(error)
})
