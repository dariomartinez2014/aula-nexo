import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

export const boton = 'inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60'
export const campo = 'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm'
export const panel = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'

export function Cargando({ texto = 'Cargando...' }: { texto?: string }) {
  return <p role="status" className="flex items-center gap-3 rounded-xl bg-white p-5 text-slate-600">
    <LoaderCircle className="animate-spin motion-reduce:animate-none" size={20} aria-hidden="true" />{texto}
  </p>
}

export function AvisoError({ mensaje, reintentar }: { mensaje: string; reintentar?: () => void }) {
  return <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
    <p>{mensaje}</p>
    {reintentar && <button type="button" className={`${boton} mt-3`} onClick={reintentar}>Reintentar</button>}
  </div>
}

export function Encabezado({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return <header className="mb-7">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{titulo}</h1>
    {children && <p className="mt-2 text-slate-600">{children}</p>}
  </header>
}
