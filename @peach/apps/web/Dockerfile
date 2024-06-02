FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN npm i --global turbo
COPY . .

RUN turbo prune @peach/web --docker

FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci --verbose

# Build and run in 1 step as the database needs to be available for the build
CMD npx turbo run build --filter=@peach/web... && npm run start -w @peach/web




# FROM node:20-alpine AS base

# FROM base AS prepare
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app

# RUN npm i --global turbo
# COPY . .
# RUN turbo prune @peach/web --docker

# FROM base AS run
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app

# COPY .gitignore .gitignore
# COPY --from=builder /app/out/full/ .
# COPY --from=builder /app/out/package-lock.json ./package-lock.json
# COPY --from=builder /app/out/package-lock.json ./package-lock.json
# COPY --from=builder /app/.env.prod ./.env.local
# RUN npm ci --verbose

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# CMD npx turbo run build --filter=@peach/web... && npm run start -w @peach/web