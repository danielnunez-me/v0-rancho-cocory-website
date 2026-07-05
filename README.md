# Rancho Cocory — Monorepo CMS Headless

Monorepo con frontend Next.js y backend CMS (Next.js Route Handlers + Supabase Postgres) para el sitio de Rancho Cocory.

## Estructura

```
apps/web/              → Frontend Next.js + API /api/cms/*
apps/api/              → API Hono opcional para desarrollo local
packages/shared/       → Tipos Zod y contenido por defecto
packages/cms-server/   → Lógica compartida (Prisma, auth, contenido)
```

## Inicio rápido

```bash
pnpm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local

# Configura DATABASE_URL y DIRECT_URL con tu proyecto Supabase

# Migrar y seed de la base de datos
pnpm db:migrate
pnpm db:seed

# Iniciar frontend (incluye API integrada en /api/cms)
pnpm dev:web

# Opcional: API Hono separada para desarrollo
pnpm dev:api
```

- Frontend: http://localhost:3000
- API integrada: http://localhost:3000/api/cms/*
- API Hono (opcional): http://localhost:3001

## Edición inline (sin panel admin)

1. Visita `http://localhost:3000/?edit_key=dev-edit-key`
2. Ingresa la contraseña (`admin123` por defecto)
3. Aparece el botón flotante de editar (esquina inferior izquierda)
4. Edita textos, imágenes, listas y colores directamente en la página

## Deploy en Vercel + Supabase

### 1. Crear proyecto Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. En **Project Settings → Database**, copia:
   - **Transaction pooler** (puerto 6543) → `DATABASE_URL`
   - **Direct connection** (puerto 5432) → `DIRECT_URL`

### 2. Migrar la base de datos

Desde tu máquina local con las credenciales de Supabase:

```bash
pnpm db:migrate
pnpm db:seed
```

### 3. Variables de entorno en Vercel

Configura en el proyecto Vercel (scope **Preview** y **Production**):

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Connection string pooler de Supabase (6543) |
| `DIRECT_URL` | Connection string directa (5432) |
| `EDIT_KEY` | Clave secreta para `?edit_key=` en la URL |
| `ADMIN_PASSWORD` | Contraseña del editor inline |
| `INSTAGRAM_ACCESS_TOKEN` | Opcional |
| `INSTAGRAM_USER_ID` | Opcional |
| `GOOGLE_PLACES_API_KEY` | Opcional |
| `GOOGLE_PLACE_ID` | Opcional |

**Nota:** `EDIT_KEY` debe configurarse en Vercel (ya no en un API externo). El editor funciona en preview con `https://tu-preview.vercel.app/?edit_key=TU_EDIT_KEY`.

### 4. Verificar preview

Tras desplegar, prueba:

```
GET /api/cms/auth/me?edit_key=TU_EDIT_KEY
```

Debe retornar `{ "hasValidEditKey": true, ... }`.

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/cms/content` | Contenido de la landing |
| PATCH | `/api/cms/content` | Actualización parcial (requiere sesión) |
| POST | `/api/cms/auth/login` | Login con password + edit_key |
| GET | `/api/cms/auth/me` | Estado de autenticación |
| POST | `/api/cms/auth/logout` | Cerrar sesión |
| GET | `/api/cms/instagram/feed` | Feed de Instagram cacheado |
| GET | `/api/cms/google/reviews` | Reseñas de Google cacheadas |

## Instagram Graph API

1. Crea una app en [Meta for Developers](https://developers.facebook.com/)
2. Vincula una cuenta Instagram Business/Creator a una Facebook Page
3. Genera un long-lived access token con permisos `instagram_basic`
4. Configura `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID` en Vercel o `.env`

Sin credenciales, la galería muestra posts de fallback del CMS.

## Google Places API

1. Habilita **Places API (New)** en [Google Cloud Console](https://console.cloud.google.com/)
2. Crea una API key con restricciones
3. Configura `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID` en Vercel o `.env`

Sin credenciales, la sección de testimonios muestra un mensaje informativo.

## Loader video

Coloca el archivo de video en `apps/web/public/`:

- `loader-video.webm` (principal)
- `loader-video.mp4` (fallback Safari)

## Scripts

```bash
pnpm dev          # Frontend + API Hono en paralelo
pnpm dev:web      # Solo frontend (API integrada)
pnpm dev:api      # Solo API Hono
pnpm db:migrate   # Migraciones Prisma (Supabase)
pnpm db:seed      # Seed contenido inicial
pnpm build        # Build del frontend
```
