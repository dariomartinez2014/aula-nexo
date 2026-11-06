# Aula Nexo

Plataforma de cursos con React, TypeScript, Vite y Tailwind. Usa la API de Academia FUNVAL. El repositorio de clase se usÃ³ como referencia para la separaciÃ³n entre tipos, servicios y pantallas.

## Desarrollo

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

La primera peticiÃ³n a la API puede tardar alrededor de 50 segundos. El catÃ¡logo, las inscripciones y las mÃ©tricas se consultan desde el servidor.

## Vercel

Importa el repositorio como proyecto Vite y configura `VITE_API_URL=https://api-academia-funval.onrender.com/api` en Production. El build usa `npm run build` y la salida es `dist`. `vercel.json` permite abrir las rutas directamente.

## VerificaciÃ³n

```sh
npm run lint
npm run build
```

[DocumentaciÃ³n de la API](https://api-academia-funval.onrender.com/api/docs/)
