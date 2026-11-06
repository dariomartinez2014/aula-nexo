import type { Curso } from './curso'

export interface Inscripcion {
  id: number
  estado: 'ACTIVA' | 'RETIRADA' | 'FINALIZADA'
  fecha: string
  curso: Pick<Curso, 'id' | 'codigo' | 'nombre' | 'creditos'>
}
