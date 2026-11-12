# farkapi

GraphQL API for a Politics & War Discord community. Resolves a player's Discord identity to
their in-game nation and the servers they belong to.

This is the middle tier of a three-part system:

| | |
|---|---|
| **[farkistan-pw-client-app](https://github.com/martip23/farkistan-pw-client-app)** | React client |
| **farkapi** *(this repo)* | GraphQL API |
| **[benderts](https://github.com/martip23/benderts)** | Discord bot |

---

## Stack

- **TypeScript**
- **Apollo Server 3** — GraphQL server
- **Nexus** — code-first schema; types and resolvers are TypeScript, the SDL is generated
- **Prisma 3** → **PostgreSQL**
- **Auth0** — JWT verification via JWKS

## Architecture

### Authentication

Identity is delegated to Auth0 using Discord as the upstream provider. Every request
except introspection goes through the context builder in `src/context.ts`:

1. `decodeAuthHeader` (`src/utils/auth.ts`) pulls the Bearer token and verifies it with
   **`jwks-rsa`** — RS256, with `audience` and `issuer` both checked against config.
   The signing key is fetched from the tenant's `/.well-known/jwks.json`.
2. `getSelfData` (`src/utils/authUser.ts`) calls the Auth0 Management API for the user.
3. The Discord ID is parsed out of the Auth0 subject (`oauth2|discord|<id>`).
4. If no `User` row exists for that Discord ID, one is **provisioned on the spot**. A user
   exists in the database from their first authenticated request — there is no signup flow.

### Data model

`prisma/schema.prisma` — two models, one-to-one-to-many:

- **`User`** — keyed by `discordId`. Carries the Discord identity and the linked Politics &
  War nation (`nationId`, `nationName`, `nationUsername`, `nationVerified`).
- **`ServerData`** — one row per Discord guild the user is in. Holds the per-guild username
  and a `String[]` of roles, related back to `User` by `discordId`.

Four migrations are in `prisma/migrations`, including a `discordId` type change from
`BIGINT` to `String` (Discord snowflakes exceed what a JS number holds safely) and a model
rename.

### Schema generation

`npm run generate` runs `src/schema.ts`, which calls Nexus `makeSchema` and writes
`src/generated/schema.graphql` and `src/generated/nexus-typegen.ts`. Generated output is
gitignored — run it after changing any type in `src/graphql/`.

---

## Running it

```bash
npm install
npm run dev:db          # starts Postgres in Docker
npx prisma migrate dev  # applies migrations
npm run generate        # emits the Nexus schema + typings
npm run dev             # http://localhost:5050
```

`npm run db:view` opens Prisma Studio against the database.

### Environment

A `.env` in the project root:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUDIENCE_ID=https://your-tenant.us.auth0.com/api/v2/
```

---

## Known limitations

Written in 2022 as a side project for roughly ten users. These are real and I know about
them:

- **N+1 queries.** `User.serverData` and `ServerData.user` each resolve with a per-parent
  Prisma call, so a list query costs one round trip per row. A DataLoader batching layer is
  the fix.
- **`users` is unbounded** — `findMany()` with no pagination or limit.
- **Authentication without authorization.** The context verifies who you are; no resolver
  checks what you're allowed to see. Any authenticated caller can query any user. Field- or
  resolver-level authz is the missing piece.
- **The Dockerfile is broken** — it runs `npm run build`, which isn't defined in
  `package.json`. The compose setup works for Postgres; the API itself runs via `npm run dev`.
- **No tests**, no input validation, no rate limiting, no structured logging.
- `src/graphql/Auth.ts` is an empty leftover.
- Apollo Server 3 and Prisma 3 are both a major version behind.
