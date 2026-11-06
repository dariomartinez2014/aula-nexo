import { api } from '../lib/axios'
import type { RespuestaApi } from '../types/api'
import type { Sesion } from '../types/usuario'

export interface LoginDatos {
  username: string
  password: string
}

export interface RegistroDatos extends LoginDatos {
  nombre: string
  apellido: string
  email?: string
}

export const authService = {
  async login(datos: LoginDatos) {
    const { data } = await api.post<RespuestaApi<Sesion>>('/auth/login', datos)
    return data.data
  },
  async registrar(datos: RegistroDatos) {
    const { data } = await api.post<RespuestaApi<Sesion>>('/auth/register', datos)
    return data.data
  },
}
