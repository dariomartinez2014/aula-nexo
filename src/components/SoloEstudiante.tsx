import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function SoloEstudiante() {
  const rol = useAuthStore((s) => s.sesion?.usuario.rol)
  return rol === 'ESTUDIANTE' ? <Outlet /> : <Navigate to="/inicio" replace />
}
