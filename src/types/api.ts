export interface RespuestaApi<T> {
  success: boolean
  data: T
  message?: string
}

export interface ListaApi<T> extends RespuestaApi<T[]> {
  meta: { page: number; limit: number; total: number; totalPages: number }
}
