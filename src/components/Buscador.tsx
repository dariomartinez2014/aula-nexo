import { Search } from 'lucide-react'
import { campo } from './ui'

interface Props {
  valor: string
  onCambiar: (valor: string) => void
}

export function Buscador({ valor, onCambiar }: Props) {
  return <label className="relative mb-5 block max-w-md">
    <span className="sr-only">Buscar por nombre o cÃ³digo</span>
    <Search className="absolute top-3 left-3 text-slate-500" size={18} aria-hidden="true" />
    <input className={`${campo} pl-10`} type="search" value={valor} onChange={(evento) => onCambiar(evento.target.value)} placeholder="Buscar por nombre o cÃ³digo" />
  </label>
}
