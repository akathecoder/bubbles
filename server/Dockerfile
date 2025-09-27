
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json src ./

RUN pnpm install --frozen-lockfile && \
    pnpm run build && \
    pnpm prune --prod

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
COPY --from=builder --chown=hono:nodejs /app/pnpm-lock.yaml /app/pnpm-lock.yaml

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]