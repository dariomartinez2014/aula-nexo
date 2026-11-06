import { useCallback, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DatosCurso } from '../components/DatosCurso'
import { AvisoError, boton, Cargando, Encabezado, panel } from '../components/ui'
import { useApi } from '../hooks/useApi'
import { mensajeError } from '../lib/errores'
import { cursosService } from '../services/cursos'
import { inscripcionesService } from '../services/inscripciones'
import { useAuthStore } from '../store/useAuthStore'

function Detalle({ id }: { id: number }) {
  const esEstudiante = useAuthStore((s) => s.sesion?.usuario.rol === 'ESTUDIANTE')
  const pedir = useCallback(async (signal: AbortSignal) => {
    const [curso, inscripciones] = await Promise.all([
      cursosService.getPorId(id, signal),
      esEstudiante ? inscripcionesService.getMias(signal) : Promise.resolve([]),
    ])
    return {
      curso,
      inscrito: inscripciones.some((inscripcion) => inscripcion.curso.id === id && inscripcion.estado === 'ACTIVA'),
    }
  }, [id, esEstudiante])
  const { data, cargando, error, recargar } = useApi(pedir)
  const [enviando, setEnviando] = useState(false)
  const [inscripcionConfirmada, setInscripcionConfirmada] = useState(false)
  const [errorInscripcion, setErrorInscripcion] = useState('')

  const inscrito = inscripcionConfirmada || Boolean(data?.inscrito)
  const sinCupos = data !== null && data.curso.disponibles <= 0

  async function inscribir() {
    if (!esEstudiante || !data || enviando || inscrito || sinCupos) return
    setEnviando(true)
    setErrorInscripcion('')
    try {
      await inscripcionesService.inscribirme(id)
      setInscripcionConfirmada(true)
      recargar()
    } catch (error) {
      setErrorInscripcion(mensajeError(error, 'No se pudo completar la inscripciÃ³n.'))
    } finally {
      setEnviando(false)
    }
  }

  return <>
    <Link to="/cursos" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
      <ArrowLeft size={17} aria-hidden="true" /> Volver al catÃ¡logo
    </Link>
    {inscripcionConfirmada && <p role="status" className="mb-4 rounded-xl bg-emerald-100 p-4 text-emerald-900">InscripciÃ³n confirmada.</p>}
    {cargando ? <Cargando /> : error ? <AvisoError mensaje={error} reintentar={recargar} /> :
      data && <section className={`${panel} max-w-2xl`}>
        <p className="mb-2 text-sm font-semibold text-brand">{data.curso.codigo} Â· {data.curso.creditos} crÃ©ditos</p>
        <Encabezado titulo={data.curso.nombre} />
        <DatosCurso curso={data.curso} />
        {errorInscripcion && <div className="mt-5"><AvisoError mensaje={errorInscripcion} /></div>}
        {esEstudiante && <button type="button" className={`${boton} mt-6`} onClick={inscribir} disabled={enviando || inscrito || sinCupos}>
          {enviando ? 'Inscribiendo...' : inscrito ? 'Inscrito' : sinCupos ? 'Sin cupos' : 'Inscribirme'}
        </button>}
      </section>}
  </>
}

export function CursoDetallePage() {
  const { id } = useParams()
  const cursoId = Number(id)
  if (!Number.isSafeInteger(cursoId) || cursoId <= 0) {
    return <><Encabezado titulo="Curso no encontrado" /><Link className={boton} to="/cursos">Volver al catÃ¡logo</Link></>
  }
  return <Detalle key={cursoId} id={cursoId} />
}
