# Rancho Cocory — Monorepo CMS Headless

Monorepo con frontend Next.js y backend CMS headless (Hono + Prisma) para el sitio de Rancho Cocory.

## Estructura

```
apps/web/          → Frontend Next.js (landing page)
apps/api/          → Backend CMS headless (API privada)
packages/shared/   → Tipos Zod y contenido por defecto
```

## Inicio rápido

```bash
pnpm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local

# Migrar y seed de la base de datos
pnpm db:migrate
pnpm db:seed

# Iniciar frontend + backend
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## Edición inline (sin panel admin)

1. Visita `http://localhost:3000/?edit_key=dev-edit-key`
2. Ingresa la contraseña (`admin123` por defecto)
3. Aparece el botón flotante de editar (esquina inferior izquierda)
4. Edita textos, imágenes, listas y colores directamente en la página

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/content` | Contenido de la landing |
| PATCH | `/content` | Actualización parcial (requiere sesión) |
| POST | `/auth/login` | Login con password + edit_key |
| GET | `/auth/me` | Estado de autenticación |
| GET | `/instagram/feed` | Feed de Instagram cacheado |
| GET | `/google/reviews` | Reseñas de Google cacheadas |

## Instagram Graph API

1. Crea una app en [Meta for Developers](https://developers.facebook.com/)
2. Vincula una cuenta Instagram Business/Creator a una Facebook Page
3. Genera un long-lived access token con permisos `instagram_basic`
4. Configura en `apps/api/.env`:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_USER_ID`

Sin credenciales, la galería muestra posts de fallback del CMS.

## Google Places API

1. Habilita **Places API (New)** en [Google Cloud Console](https://console.cloud.google.com/)
2. Crea una API key con restricciones
3. Configura en `apps/api/.env`:
   - `GOOGLE_PLACES_API_KEY`
   - `GOOGLE_PLACE_ID` (default: Rancho Cocory)

Sin credenciales, la sección de testimonios muestra un mensaje informativo.

## Scripts

```bash
pnpm dev          # Frontend + API en paralelo
pnpm dev:web      # Solo frontend
pnpm dev:api      # Solo API
pnpm db:migrate   # Migraciones Prisma
pnpm db:seed      # Seed contenido inicial
pnpm build        # Build de todos los paquetes
```
