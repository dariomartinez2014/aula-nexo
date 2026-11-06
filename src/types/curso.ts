import type { UsuarioResumen } from './usuario'

export interface Curso {
  id: number
  codigo: string
  nombre: string
  descripcion: string | null
  creditos: number
  cupo: number
  inscritos: number
  disponibles: number
  docente: UsuarioResumen | null
  createdAt: string
  updatedAt: string
}
