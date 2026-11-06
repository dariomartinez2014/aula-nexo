import { Link } from 'react-router-dom'
import { AvisoError, Cargando, Encabezado, panel } from '../components/ui'
import { useApi } from '../hooks/useApi'
import { inscripcionesService } from '../services/inscripciones'
import type { Inscripcion } from '../types/inscripcion'

const estados: Record<Inscripcion['estado'], string> = {
  ACTIVA: 'Activa',
  RETIRADA: 'Retirada',
  FINALIZADA: 'Finalizada',
}
const fecha = new Intl.DateTimeFormat('es-GT', { dateStyle: 'medium', timeZone: 'America/Guatemala' })

export function InscripcionesPage() {
  const { data, error, cargando, recargar } = useApi(inscripcionesService.getMias)
  return <>
    <Encabezado titulo="Mis inscripciones">Consulta el estado de los cursos que has inscrito.</Encabezado>
    {cargando ? <Cargando /> : error ? <AvisoError mensaje={error} reintentar={recargar} /> :
      !data?.length ? <div className={panel}>
        <p className="mb-2">Todavía no tienes inscripciones.</p>
        <Link className="font-semibold text-brand underline" to="/cursos">Explorar cursos</Link>
      </div> :
      <ul className="space-y-3">
        {data.map(({ id, curso, estado, fecha: inscritoEl }) => <li key={id} className={`${panel} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="mb-1 text-xs font-semibold text-brand">{curso.codigo} · {curso.creditos} créditos</p>
            <Link className="font-bold hover:underline" to={`/cursos/${curso.id}`}>{curso.nombre}</Link>
            <p className="mt-1 text-sm text-slate-600">{fecha.format(new Date(inscritoEl))}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${estado === 'ACTIVA' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-700'}`}>{estados[estado]}</span>
        </li>)}
      </ul>}
  </>
}
