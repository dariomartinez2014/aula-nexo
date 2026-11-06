import { useState, type FormEvent } from 'react'
import { BookOpen, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AvisoError, boton, campo } from '../components/ui'
import { mensajeError } from '../lib/errores'
import { authService } from '../services/auth'
import { useAuthStore } from '../store/useAuthStore'

export function AuthPage({ registro = false }: { registro?: boolean }) {
  const sesion = useAuthStore((s) => s.sesion)
  const iniciarSesion = useAuthStore((s) => s.iniciarSesion)
  const navegar = useNavigate()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  if (sesion) return <Navigate to="/inicio" replace />

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (enviando) return
    const formulario = new FormData(evento.currentTarget)
    const leer = (nombre: string) => String(formulario.get(nombre) ?? '')
    const credenciales = { username: leer('username').trim(), password: leer('password') }
    setError('')
    setEnviando(true)
    try {
      const resultado = registro
        ? await authService.registrar({
            ...credenciales,
            nombre: leer('nombre').trim(),
            apellido: leer('apellido').trim(),
            email: leer('email').trim() || undefined,
          })
        : await authService.login(credenciales)
      iniciarSesion(resultado)
      navegar('/inicio', { replace: true })
    } catch (error) {
      setError(mensajeError(error, registro ? 'No se pudo crear la cuenta.' : 'No se pudo iniciar sesiÃ³n.'))
    } finally {
      setEnviando(false)
    }
  }

  return <main className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
    <aside className="flex flex-col justify-between gap-12 bg-ink px-7 py-9 text-white sm:p-12 lg:p-16">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <span className="rounded-xl bg-brand p-2.5"><BookOpen size={22} aria-hidden="true" /></span>Aula Nexo
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold tracking-widest text-emerald-300 uppercase">Aprendizaje en lÃ­nea</p>
        <p className="max-w-lg text-4xl leading-tight font-bold sm:text-5xl">Tu siguiente curso empieza aquÃ­.</p>
        <p className="mt-4 max-w-md text-slate-300">Explora el catÃ¡logo, consulta los cupos y organiza tus inscripciones.</p>
      </div>
      <p className="hidden text-sm text-slate-400 lg:block">Aula Nexo Â· Plataforma de cursos</p>
    </aside>
    <section className="flex items-center justify-center px-6 py-10">
      <form className="w-full max-w-md space-y-4" onSubmit={enviar}>
        <div className="mb-7">
          <h1 className="text-3xl font-bold">{registro ? 'Crea tu cuenta' : 'Iniciar sesiÃ³n'}</h1>
          <p className="mt-2 text-slate-600">{registro ? 'RegÃ­strate como estudiante en Aula Nexo.' : 'Accede a tu espacio en Aula Nexo.'}</p>
        </div>
        {error && <AvisoError mensaje={error} />}
        {registro && <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Nombre<input className={campo} name="nombre" autoComplete="given-name" maxLength={100} required /></label>
          <label className="text-sm font-medium">Apellido<input className={campo} name="apellido" autoComplete="family-name" maxLength={100} required /></label>
        </div>}
        <label className="block text-sm font-medium">Usuario<input className={campo} name="username" autoComplete="username" required minLength={registro ? 3 : undefined} maxLength={registro ? 50 : undefined} pattern={registro ? '[a-zA-Z0-9._\\-]+' : undefined} /></label>
        {registro && <label className="block text-sm font-medium">Correo electrÃ³nico (opcional)<input className={campo} type="email" name="email" autoComplete="email" maxLength={150} /></label>}
        <label className="block text-sm font-medium">ContraseÃ±a
          <input className={campo} type="password" name="password" autoComplete={registro ? 'new-password' : 'current-password'} required minLength={registro ? 8 : undefined} maxLength={registro ? 72 : undefined} pattern={registro ? '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+' : undefined} />
          {registro && <span className="mt-1 block text-xs text-slate-600">Al menos 8 caracteres, con mayÃºscula, minÃºscula y nÃºmero.</span>}
        </label>
        <button className={`${boton} w-full`} disabled={enviando}>
          {enviando ? 'Conectando con la API...' : registro ? 'Crear cuenta' : 'Ingresar'}<ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <p className="text-sm text-slate-600">{registro ? 'Â¿Ya tienes cuenta?' : 'Â¿TodavÃ­a no tienes cuenta?'}{' '}
          <Link className="font-semibold text-brand underline" to={registro ? '/login' : '/registro'}>{registro ? 'Inicia sesiÃ³n' : 'RegÃ­strate'}</Link>
        </p>
      </form>
    </section>
  </main>
}
