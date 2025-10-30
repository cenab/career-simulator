# CareerSim Backend Architecture

The codebase now mirrors the product surface that the UI exposes while staying entirely UI-neutral. The backend is organised as a layered Express application with typed domain models shared between the client, server, and future data layer.

## Layout Snapshot

- `server/app.ts` creates the Express instance, attaches global middleware, and mounts the API router before the Vite/static handlers.
- `server/http/` contains framework-agnostic plumbing (router factory, response helpers, middlewares, and error handling).
- `server/modules/` hosts feature-specific routers. Each module owns request validation, lightweight controllers, and calls into repositories.
- `server/storage/` is an in-memory repository implementation (`InMemoryStorage`) seeded with realistic demo data. It exposes interfaces so the storage layer can later be swapped with Drizzle/Postgres without touching the HTTP layer.
- `shared/domain.ts` defines zod schemas and TypeScript types for every domain entity described by the UI flows (users, characters, scenes, chats, messages, uploads, etc.).
- `shared/schema.ts` mirrors those models using Drizzle table definitions and typed insert helpers – ready for an actual database push.
- `client/src/api/` is a thin fetch wrapper layer (built on the existing `apiRequest`) so the UI can start consuming the new endpoints without changing visuals yet.

## Domain Models (shared)

| Entity | Key Fields |
| --- | --- |
| `User` | `id`, `email`, `username`, `passwordHash`, `avatarUrl`, `bio`, timestamps |
| `ProfileMetrics` | `userId`, `totalChats`, `scenesCreated`, `hoursPracticed`, `streakDays`, `badges[]` |
| `Character` | `id`, `ownerId`, `name`, `tagline`, `description`, ordered `greetings[]`, `tags[]`, `visibility`, `aiGreetingEnabled`, `avatarUrl`, `stats` |
| `Scene` | `id`, `ownerId`, `type`, `genres[]`, `timePeriods[]`, `locations[]`, `tones[]`, `backstory`, `playerGoal`, `introText`, `characterGreeting`, `name`, `coverImageUrl`, `chatThemeColor`, `tags[]`, `visibility`, `status`, `linkedCharacterId`, `analytics` |
| `ChatSession` | `id`, `userId`, `sceneId`, `characterId`, `title`, `status`, `startedAt`, `lastActivityAt`, `settings` |
| `Message` | `id`, `chatId`, `sender`, `body`, optional `metadata`, `createdAt`, `likeState` |
| `UploadReference` | `uploadId`, `url`, `expiresAt` |

All shared types live in `shared/domain.ts` / `shared/schema.ts` and are consumed by both the server (for validation and responses) and the client API helpers.

## API Surface (implemented stubs ready for wiring)

Every handler returns a `{ data, meta? }` envelope and uses the in-memory repositories for now.

**Auth & Sessions**
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `POST /api/auth/password/reset-request`
- `POST /api/auth/password/reset`

**Profile & Users**
- `GET /api/me`
- `PATCH /api/me`
- `GET /api/me/activity`
- `PATCH /api/me/preferences`
- `GET /api/users/:userId`

**Characters**
- `GET /api/characters`
- `GET /api/characters/me`
- `POST /api/characters`
- `GET /api/characters/:id`
- `PATCH /api/characters/:id`
- `POST /api/characters/:id/publish`
- `DELETE /api/characters/:id`

**Scenes & Publishing**
- `GET /api/scenes`
- `GET /api/scenes/me`
- `POST /api/scenes`
- `GET /api/scenes/:id`
- `PATCH /api/scenes/:id`
- `POST /api/scenes/:id/publish`
- `POST /api/uploads`

**Discovery & Search**
- `GET /api/discover/overview`
- `GET /api/search`
- `GET /api/search/suggestions`

**Chats & Simulation**
- `POST /api/chats`
- `GET /api/chats/:chatId`
- `GET /api/chats/:chatId/messages`
- `GET /api/chats/:chatId/messages/latest`
- `POST /api/chats/:chatId/messages`
- `POST /api/chats/:chatId/messages/:messageId/feedback`
- `POST /api/chats/:chatId/pin`
- `DELETE /api/chats/:chatId/pin`
- `GET /api/chats/me?scope=recent|pinned`
- `POST /api/chats/:chatId/analysis`
- `POST /api/chats/:chatId/voice`

**Metadata & Collections**
- `GET /api/tags`
- `GET /api/collections`
- `POST /api/collections/:id/items` (placeholder throws `NotImplementedError` until admin workflows exist)
- `GET /api/trending`
- `GET /api/chat/options`

## Development Flow

```
npm install
npm run dev    # boots express + Vite for local integration
npm run check  # type-checks server, shared, and client API helpers
```

The in-memory storage (`server/storage/memory.ts`) seeds a coherent scenario (Task Force 141 crisis simulation). This keeps the UI populated during integration while you replace repositories with database-backed implementations.

## Next Steps

1. Replace `InMemoryStorage` with Drizzle repositories by wiring the tables defined in `shared/schema.ts` to a real database (Neon or Supabase, as planned).
2. Extend the auth module with real session management (HTTP-only cookies + refresh tokens) and enforce auth guards per route.
3. Back the SSE/WebSocket hooks for live chat streaming; the RESTful fallbacks are already defined.
4. Gradually point UI hooks to the new `client/src/api` helpers to remove hard-coded demo data while keeping the visual layer untouched.
5. Add automated tests around modules once persistence lands—structure is ready for injection via the storage interfaces.
