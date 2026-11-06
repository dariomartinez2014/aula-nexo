import { useEffect, useState } from 'react'
import { mensajeError } from '../lib/errores'

type Peticion<T> = (signal: AbortSignal) => Promise<T>

interface Resultado<T> {
  pedir: Peticion<T>
  intento: number
  data: T | null
  error: string | null
}

export function useApi<T>(pedir: Peticion<T>) {
  const [intento, setIntento] = useState(0)
  const [resultado, setResultado] = useState<Resultado<T> | null>(null)

  useEffect(() => {
    const controlador = new AbortController()
    const { signal } = controlador
    pedir(signal).then((data) => {
      if (!signal.aborted) setResultado({ pedir, intento, data, error: null })
    }).catch((error: unknown) => {
      if (!signal.aborted) setResultado({ pedir, intento, data: null, error: mensajeError(error) })
    })
    return () => controlador.abort()
  }, [pedir, intento])

  const actual = resultado?.pedir === pedir && resultado.intento === intento ? resultado : null
  return {
    data: actual?.data ?? null,
    error: actual?.error ?? null,
    cargando: actual === null,
    recargar: () => setIntento((n) => n + 1),
  }
}
