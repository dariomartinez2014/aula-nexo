import axios from 'axios'

export function mensajeError(error: unknown, alternativa = 'No se pudo completar la solicitud.') {
  if (axios.isAxiosError(error)) {
    const datos = error.response?.data
    const detalle = datos?.details?.[0]?.mensaje ?? datos?.message
    if (typeof detalle === 'string' && detalle) return detalle
    if (!error.response) return 'No se pudo conectar con la API. Intenta de nuevo.'
    return alternativa
  }
  return error instanceof Error && error.message ? error.message : alternativa
}
