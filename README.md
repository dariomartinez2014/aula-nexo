# Aula Nexo

Plataforma de cursos con React, TypeScript, Vite y Tailwind. Usa la API de Academia FUNVAL. El repositorio de clase se usó como referencia para la separación entre tipos, servicios y pantallas.

## Desarrollo

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

La primera petición a la API puede tardar alrededor de 50 segundos. El catálogo, las inscripciones y las métricas se consultan desde el servidor.

## Vercel

Importa el repositorio como proyecto Vite y configura `VITE_API_URL=https://api-academia-funval.onrender.com/api` en Production. El build usa `npm run build` y la salida es `dist`. `vercel.json` permite abrir las rutas directamente.

## Verificación

```sh
npm run lint
npm run build
```

[Documentación de la API](https://api-academia-funval.onrender.com/api/docs/)
