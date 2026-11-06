import { api } from '../lib/axios'
import { obtenerTodos } from '../lib/paginacion'
import type { ListaApi, RespuestaApi } from '../types/api'
import type { Inscripcion } from '../types/inscripcion'

export const inscripcionesService = {
  getMias(signal?: AbortSignal) {
    return obtenerTodos(async (page) => {
      const { data } = await api.get<ListaApi<Inscripcion>>('/inscripciones', {
        params: { page, limit: 100 }, signal,
      })
      return data
    })
  },
  async inscribirme(cursoId: number) {
    const { data } = await api.post<RespuestaApi<Inscripcion>>('/inscripciones', { cursoId })
    return data.data
  },
}
