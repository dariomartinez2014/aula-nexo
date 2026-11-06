import type { ListaApi } from '../types/api'

export async function obtenerTodos<T>(pedir: (pagina: number) => Promise<ListaApi<T>>) {
  const filas: T[] = []
  let pagina = 1
  let totalPaginas: number
  do {
    const respuesta = await pedir(pagina)
    filas.push(...respuesta.data)
    totalPaginas = respuesta.meta.totalPages
    pagina += 1
  } while (pagina <= totalPaginas)
  return filas
}
