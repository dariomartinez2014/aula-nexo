import { api } from '../lib/axios'
import { obtenerTodos } from '../lib/paginacion'
import type { ListaApi, RespuestaApi } from '../types/api'
import type { Curso } from '../types/curso'

export const cursosService = {
  getTodos(signal?: AbortSignal) {
    return obtenerTodos(async (page) => {
      const { data } = await api.get<ListaApi<Curso>>('/cursos', { params: { page, limit: 100 }, signal })
      return data
    })
  },
  async getPorId(id: number, signal?: AbortSignal) {
    const { data } = await api.get<RespuestaApi<Curso>>(`/cursos/${id}`, { signal })
    return data.data
  },
  async getTotal(signal?: AbortSignal) {
    const { data } = await api.get<ListaApi<Curso>>('/cursos', { params: { limit: 1 }, signal })
    return data.meta.total
  },
}
