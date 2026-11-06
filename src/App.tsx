import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { boton, Encabezado } from './components/ui'
import { AuthPage } from './pages/AuthPage'
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
        <Route path="/inicio" element={<Encabezado titulo="Inicio" />} />
      </Route>
    </Route>
    <Route path="*" element={<main className="mx-auto max-w-lg px-6 py-24">
      <Encabezado titulo="PÃ¡gina no encontrada">La direcciÃ³n que abriste no existe.</Encabezado>
      <Link className={boton} to="/">Volver al inicio</Link>
    </main>} />
  </Routes>
}
