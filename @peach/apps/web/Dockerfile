FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i --global turbo
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune @peach/web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci --verbose

# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=@peach/web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/@peach/apps/web/next.config.js .
COPY --from=installer /app/@peach/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/@peach/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/@peach/apps/web/.next/static ./@peach/apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/@peach/apps/web/public ./@peach/apps/web/public

CMD node @peach/apps/web/server.js