# syntax=docker/dockerfile:1.7
# ------------------------------------------------------------------
# ACIEA website — production image (Next.js standalone + Payload CMS)
# ------------------------------------------------------------------
ARG NODE_VERSION=22-bookworm-slim

FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
WORKDIR /app

# 1. Dependencies (cached layer)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 2. Build
FROM deps AS builder
COPY . .
# Build-time values only; real secrets are injected at runtime.
ARG NEXT_PUBLIC_SERVER_URL=https://aciea-burkina.org
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_MAP_TILE_URL=
ARG NEXT_PUBLIC_MAP_ATTRIBUTION=
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    NEXT_PUBLIC_MAP_TILE_URL=$NEXT_PUBLIC_MAP_TILE_URL \
    NEXT_PUBLIC_MAP_ATTRIBUTION=$NEXT_PUBLIC_MAP_ATTRIBUTION \
    PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime-000 \
    DATABASE_URL=postgres://build:build@localhost:5432/build \
    PAYLOAD_DISABLE_AUTORUN=true
RUN pnpm build

# 3. Tooling image used for migrations, seed and maintenance commands
FROM builder AS tools
ENV NODE_ENV=production
CMD ["pnpm", "migrate"]

# 4. Minimal runtime
FROM node:${NODE_VERSION} AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs \
 && mkdir -p /app/media /app/media/documents /app/uploads/private && chown -R nextjs:nodejs /app
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
