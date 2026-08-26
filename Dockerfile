# syntax=docker/dockerfile:1.7

# ==============================================================================
# DeepflowAI trades marketing site — production image
#
# Multi-stage so the runtime image carries the built site and one runtime
# dependency, not the 250MB of build tooling Vite needs. Nothing in the final
# image can rebuild or modify the app.
#
# Pinned to a Node 22 LTS digest-free tag deliberately: alpine keeps the image
# small, and 22 matches the engines field in server/package.json.
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1 — build the Vite bundle
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first so this layer caches: dependencies only reinstall when
# package.json or the lockfile actually change, not on every source edit.
COPY package.json package-lock.json* ./

# npm ci needs a lockfile; fall back to install so a fresh clone still builds.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# VITE_WEBHOOK_URL is baked into the bundle at build time — that is how Vite
# works, and it is why it must never hold a secret. It is a public URL, which is
# fine. GEMINI_API_KEY is deliberately NOT passed here; see server/index.js.
ARG VITE_WEBHOOK_URL
ENV VITE_WEBHOOK_URL=${VITE_WEBHOOK_URL}

RUN npm run build && test -f dist/index.html

# ------------------------------------------------------------------------------
# Stage 2 — runtime
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runtime

# tini gives us a real init: it reaps zombies and forwards SIGTERM so the
# graceful shutdown in server/index.js actually runs on `docker compose stop`.
RUN apk add --no-cache tini wget

ENV NODE_ENV=production \
    PORT=8080 \
    HOST=0.0.0.0

WORKDIR /app

# Runtime dependencies only — the Gemini SDK. --omit=dev keeps Vite, TypeScript
# and friends out of the production image entirely.
COPY server/package.json ./server/package.json
RUN cd server && npm install --omit=dev --no-audit --no-fund && npm cache clean --force

COPY server/index.js ./server/index.js
COPY --from=builder /app/dist ./dist

# Drop privileges. The node image ships an unprivileged `node` user (uid 1000);
# it owns nothing writable here, which is what allows read_only in compose.
RUN chown -R node:node /app
USER node

EXPOSE 8080

# Polls the app's own health route. --spider makes wget exit non-zero on any
# status other than 2xx, which is exactly the signal Docker wants.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server/index.js"]
