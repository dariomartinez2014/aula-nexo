import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AvisoError, boton, Cargando, Encabezado, panel } from '../components/ui'
import { useApi } from '../hooks/useApi'
import { cursosService } from '../services/cursos'
import { inscripcionesService } from '../services/inscripciones'
import { usuariosService } from '../services/usuarios'
import { useAuthStore } from '../store/useAuthStore'
import type { Usuario } from '../types/usuario'

function Metrica({ titulo, valor, icono: Icono }: { titulo: string; valor: number; icono: typeof BookOpen }) {
  return <article className={panel}>
    <Icono size={22} className="mb-3 text-brand" aria-hidden="true" />
    <h2 className="text-sm font-medium text-slate-600">{titulo}</h2>
    <p className="mt-1 text-3xl font-bold">{valor}</p>
  </article>
}

function InicioEstudiante({ usuario }: { usuario: Usuario }) {
  const { data, cargando, error, recargar } = useApi(inscripcionesService.getMias)
  const activas = (data ?? []).filter(({ estado }) => estado === 'ACTIVA')
  const creditos = activas.reduce((total, { curso }) => total + curso.creditos, 0)
  return <>
    <Encabezado titulo={`Hola, ${usuario.nombre}`}>Consulta tus cursos activos y los crÃ©ditos que llevas.</Encabezado>
    {cargando ? <Cargando /> : error ? <AvisoError mensaje={error} reintentar={recargar} /> :
      <>
        <div className="grid gap-4 sm:grid-cols-2">
          <Metrica titulo="Cursos inscritos activos" valor={activas.length} icono={BookOpen} />
          <Metrica titulo="CrÃ©ditos activos" valor={creditos} icono={GraduationCap} />
        </div>
        <section className={`${panel} mt-5`}>
          <h2 className="mb-3 text-xl font-bold">Mis cursos activos</h2>
          {activas.length ? <ul className="divide-y divide-slate-100">
            {activas.map(({ id, curso }) => <li key={id} className="py-2"><Link className="font-medium text-brand hover:underline" to={`/cursos/${curso.id}`}>{curso.codigo} Â· {curso.nombre}</Link></li>)}
          </ul> : <p className="text-slate-600">AÃºn no tienes cursos activos.</p>}
        </section>
      </>}
    <Link className={`${boton} mt-6`} to="/cursos">Explorar catÃ¡logo <ArrowRight size={17} aria-hidden="true" /></Link>
  </>
}

async function pedirTotales(signal: AbortSignal) {
  const [cursos, estudiantes] = await Promise.all([
    cursosService.getTotal(signal),
    usuariosService.getTotalEstudiantes(signal),
  ])
  return { cursos, estudiantes }
}

function InicioAdmin({ usuario }: { usuario: Usuario }) {
  const { data, cargando, error, recargar } = useApi(pedirTotales)
  return <>
    <Encabezado titulo={`Hola, ${usuario.nombre}`}>Vista general de la academia.</Encabezado>
    {cargando ? <Cargando /> : error ? <AvisoError mensaje={error} reintentar={recargar} /> :
      data && <div className="grid gap-4 sm:grid-cols-2">
        <Metrica titulo="Total de cursos" valor={data.cursos} icono={BookOpen} />
        <Metrica titulo="Total de estudiantes" valor={data.estudiantes} icono={Users} />
      </div>}
  </>
}

export function InicioPage() {
  const usuario = useAuthStore((s) => s.sesion?.usuario)
  if (!usuario) return null
  if (usuario.rol === 'ADMIN') return <InicioAdmin usuario={usuario} />
  if (usuario.rol === 'ESTUDIANTE') return <InicioEstudiante usuario={usuario} />
  return <>
    <Encabezado titulo={`Hola, ${usuario.nombre}`}>Consulta el catÃ¡logo de Aula Nexo.</Encabezado>
    <Link className={boton} to="/cursos">Explorar catÃ¡logo</Link>
  </>
}
