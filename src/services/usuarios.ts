import { api } from '../lib/axios'
import type { ListaApi } from '../types/api'
import type { Usuario } from '../types/usuario'

export const usuariosService = {
  async getTotalEstudiantes(signal?: AbortSignal) {
    const { data } = await api.get<ListaApi<Usuario>>('/usuarios', {
      params: { rol: 'ESTUDIANTE', limit: 1 }, signal,
    })
    return data.meta.total
  },
}
