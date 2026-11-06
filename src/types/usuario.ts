export type Rol = 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE'

export interface UsuarioResumen {
  id: number
  username: string
  nombre: string
  apellido: string
  fotoUrl: string | null
}

export interface Usuario extends UsuarioResumen {
  email: string | null
  rol: Rol
  activo: boolean
}

export interface Sesion {
  token: string
  usuario: Usuario
}
