import { BookOpen, Home, ListChecks, LogOut } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function Layout() {
  const usuario = useAuthStore((s) => s.sesion?.usuario)
  const cerrarSesion = useAuthStore((s) => s.cerrarSesion)
  const enlaces = [
    { to: '/inicio', texto: 'Inicio', icono: Home },
    { to: '/cursos', texto: 'Cursos', icono: BookOpen },
    ...(usuario?.rol === 'ESTUDIANTE'
      ? [{ to: '/inscripciones', texto: 'Mis inscripciones', icono: ListChecks }]
      : []),
  ]
  return <div className="min-h-screen md:grid md:grid-cols-[225px_1fr]">
    <aside className="bg-ink p-4 text-white md:sticky md:top-0 md:flex md:h-screen md:flex-col md:p-6">
      <div className="mb-5 flex items-center gap-3 text-lg font-bold">
        <span className="rounded-xl bg-brand p-2"><BookOpen size={20} aria-hidden="true" /></span>Aula Nexo
      </div>
      <nav aria-label="NavegaciÃ³n principal" className="flex flex-wrap gap-2 md:flex-col">
        {enlaces.map(({ to, texto, icono: Icono }) => <NavLink key={to} to={to} className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-white/15 font-semibold' : 'text-slate-300 hover:bg-white/10'}`
        }><Icono size={18} aria-hidden="true" />{texto}</NavLink>)}
      </nav>
      <button type="button" onClick={cerrarSesion} className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/10 md:mt-auto"><LogOut size={17} aria-hidden="true" />Cerrar sesiÃ³n</button>
    </aside>
    <div className="min-w-0">
      <header className="flex flex-wrap justify-between gap-2 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <span className="text-sm font-medium text-slate-600">Plataforma de cursos</span>
        <span className="text-sm font-semibold">{usuario?.nombre} {usuario?.apellido}</span>
      </header>
      <main className="mx-auto max-w-7xl p-5 sm:p-8"><Outlet /></main>
    </div>
  </div>
}
