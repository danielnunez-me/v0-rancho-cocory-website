# Rancho Cocory — Monorepo CMS Headless

Monorepo con frontend Next.js y backend CMS (Next.js Route Handlers + Firebase Firestore) para el sitio de Rancho Cocory.

## Estructura

```
apps/web/              → Frontend Next.js + API /api/cms/*
apps/api/              → API Hono opcional para desarrollo local
packages/shared/       → Tipos Zod y contenido por defecto
packages/cms-server/   → Lógica compartida (Firebase, auth, contenido)
```

## Inicio rápido

```bash
pnpm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local

# Configura FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY

# Seed de la base de datos Firestore
pnpm firebase:seed

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

## Deploy en Vercel + Firebase

### 1. Crear proyecto Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Firestore Database** (modo production)
3. En **Project Settings → Service accounts**, genera una nueva private key (JSON)
4. Mapea los campos del JSON a las variables de entorno:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (escapa `\n` en Vercel)

**Reglas Firestore:** deniega acceso cliente; todo el acceso es server-side vía Admin SDK.

### 2. Seed de la base de datos

Desde tu máquina local con las credenciales de Firebase:

```bash
pnpm firebase:seed
```

### 3. Variables de entorno en Vercel

Configura en el proyecto Vercel (scope **Preview** y **Production**):

| Variable | Descripción |
|----------|-------------|
| `FIREBASE_PROJECT_ID` | ID del proyecto Firebase |
| `FIREBASE_CLIENT_EMAIL` | Email del service account |
| `FIREBASE_PRIVATE_KEY` | Clave privada del service account |
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

El video del loader ya está en `apps/web/public/loader-video.webm`. Opcionalmente puedes agregar `loader-video.mp4` como fallback Safari.

## Scripts

```bash
pnpm dev          # Frontend + API Hono en paralelo
pnpm dev:web      # Solo frontend (API integrada)
pnpm dev:api      # Solo API Hono
pnpm firebase:seed # Seed contenido inicial en Firestore
pnpm build        # Build del frontend
```
