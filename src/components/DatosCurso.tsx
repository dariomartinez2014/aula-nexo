import { UserRound } from 'lucide-react'
import type { Curso } from '../types/curso'

export function DatosCurso({ curso }: { curso: Curso }) {
  const porcentaje = curso.cupo > 0 ? Math.min(100, Math.max(0, curso.inscritos / curso.cupo * 100)) : 0
  return <div className="space-y-4">
    <p className="text-sm leading-relaxed text-slate-600">{curso.descripcion || 'Sin descripción.'}</p>
    <p className="flex items-center gap-2 text-sm text-slate-700">
      <UserRound size={16} aria-hidden="true" />
      {curso.docente ? `${curso.docente.nombre} ${curso.docente.apellido}` : 'Sin docente asignado'}
    </p>
    <div>
      <div className="mb-1 flex flex-wrap justify-between gap-2 text-sm">
        <span className="text-slate-600">Cupos ocupados</span><strong>{curso.inscritos} / {curso.cupo}</strong>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="Ocupación del curso" aria-valuenow={Math.round(porcentaje)} aria-valuetext={`${curso.inscritos} de ${curso.cupo} cupos ocupados`}>
        <div className="h-full rounded-full bg-brand" style={{ width: `${porcentaje}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-600">{curso.disponibles} cupos disponibles</p>
    </div>
  </div>
}
