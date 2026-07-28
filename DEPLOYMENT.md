# Deploying to Coolify

Notes specific to this deployment (Oracle Cloud VM running Coolify, Postgres,
Docker image built from the repo `Dockerfile`).

## Migrations are required in production

Payload's Postgres adapter only pushes schema automatically in development. In
production it expects migration files, which live in `src/migrations/`.

Run migrations before the server starts. In Coolify, set the start command to:

```bash
npx payload migrate && npm start
```

This deployment builds with Nixpacks, not the repo's `Dockerfile` — that
Dockerfile expects `output: 'standalone'` in `next.config.ts`, which is not set,
so it would not produce a working image. The Nixpacks build keeps the full
source tree and `node_modules` at `/app`, which is what makes the `payload` CLI
available at runtime. It provides `npm`, not `pnpm`.

If migrations don't run, the app starts against a database with no tables and
every request fails.

To add a migration after changing collections, globals or blocks:

```bash
npx payload migrate:create <name>
```

Commit the generated file. Never edit an already-deployed migration — add a new
one instead.

## Uploaded media needs a persistent volume

Anything written inside the container is lost on redeploy. Payload writes
uploads to `public/media`, and the app runs from `/app`.

Mount a persistent volume at `/app/public/media` in the Coolify service, or the
media library empties every time you deploy.

If you would rather not use a volume, install `@payloadcms/storage-s3` and point
it at Oracle Object Storage, which is S3-compatible.

## Environment variables

```
DATABASE_URL=postgresql://user:password@host:5432/database
PAYLOAD_SECRET=<long random string>
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
CRON_SECRET=<random string>
PREVIEW_SECRET=<random string>
```

`NEXT_PUBLIC_SERVER_URL` must be the real public URL. It is baked into sitemaps,
SEO tags and preview links, so a placeholder value ends up in published output.

## First deploy

1. Set the environment variables above.
2. Mount the media volume.
3. Set the start command to run migrations.
4. Deploy.
5. Visit `/admin` and create the first user.

## Seeding the design's page structure

`scripts/seed-botnizer.ts` creates the solutions, case studies and all eight
pages from the Figma design.

It **deletes every existing page, case study and solution first**, so it refuses
to run unless explicitly confirmed:

```bash
ALLOW_DESTRUCTIVE_SEED=true npx payload run scripts/seed-botnizer.ts
```

Only run it against a database whose content you are willing to lose — normally
just the very first deploy.

Afterwards, restart the app. Seeding from a CLI script cannot invalidate
Next.js's cache, so the header and footer keep rendering their pre-seed state
until the server restarts.
