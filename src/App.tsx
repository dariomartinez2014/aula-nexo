import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SoloEstudiante } from './components/SoloEstudiante'
import { InscripcionesPage } from './pages/InscripcionesPage'
import { boton, Encabezado } from './components/ui'
import { AuthPage } from './pages/AuthPage'
import { InicioPage } from './pages/InicioPage'
import { CursosPage } from './pages/CursosPage'
import { CursoDetallePage } from './pages/CursoDetallePage'
import { useAuthStore } from './store/useAuthStore'

function ConSesion() {
  const sesion = useAuthStore((s) => s.sesion)
  return sesion ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Navigate to="/inicio" replace />} />
    <Route path="/login" element={<AuthPage key="login" />} />
    <Route path="/registro" element={<AuthPage key="registro" registro />} />
    <Route element={<ConSesion />}>
      <Route element={<Layout />}>
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/cursos/:id" element={<CursoDetallePage />} />
        <Route element={<SoloEstudiante />}><Route path="/inscripciones" element={<InscripcionesPage />} /></Route>
      </Route>
    </Route>
    <Route path="*" element={<main className="mx-auto max-w-lg px-6 py-24">
      <Encabezado titulo="Página no encontrada">La dirección que abriste no existe.</Encabezado>
      <Link className={boton} to="/">Volver al inicio</Link>
    </main>} />
  </Routes>
}
