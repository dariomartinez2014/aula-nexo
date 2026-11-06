import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Buscador } from '../components/Buscador'
import { DatosCurso } from '../components/DatosCurso'
import { AvisoError, Cargando, Encabezado, panel } from '../components/ui'
import { useApi } from '../hooks/useApi'
import { cursosService } from '../services/cursos'

export function CursosPage() {
  const [busqueda, setBusqueda] = useState('')
  const { data, cargando, error, recargar } = useApi(cursosService.getTodos)
  const termino = busqueda.trim().toLowerCase()
  const cursos = (data ?? []).filter(({ nombre, codigo }) =>
    nombre.toLowerCase().includes(termino) || codigo.toLowerCase().includes(termino),
  )

  return <>
    <Encabezado titulo="Catálogo de cursos">Consulta los cursos disponibles y sus cupos.</Encabezado>
    <Buscador valor={busqueda} onCambiar={setBusqueda} />
    {cargando ? <Cargando /> : error ? <AvisoError mensaje={error} reintentar={recargar} /> :
      cursos.length === 0 ? <p className={panel}>{termino ? 'Sin resultados para tu búsqueda.' : 'No hay cursos disponibles.'}</p> :
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {cursos.map((curso) => <article key={curso.id} className={`${panel} flex flex-col`}>
          <div className="mb-3 flex flex-wrap justify-between gap-2 text-xs font-semibold text-brand">
            <span>{curso.codigo}</span><span>{curso.creditos} créditos</span>
          </div>
          <h2 className="mb-2 text-xl font-bold">{curso.nombre}</h2>
          <DatosCurso curso={curso} />
          <div className="mt-auto pt-5">
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline" to={`/cursos/${curso.id}`}>Ver detalle <ArrowRight size={16} aria-hidden="true" /><span className="sr-only"> de {curso.nombre}</span></Link>
          </div>
        </article>)}
      </div>}
  </>
}
