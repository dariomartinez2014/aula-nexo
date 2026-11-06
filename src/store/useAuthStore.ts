import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Sesion } from '../types/usuario'

interface AuthState {
  sesion: Sesion | null
  iniciarSesion: (sesion: Sesion) => void
  cerrarSesion: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sesion: null,
      iniciarSesion: (sesion) => set({ sesion }),
      cerrarSesion: () => set({ sesion: null }),
    }),
    { name: 'aula-nexo-sesion' },
  ),
)
