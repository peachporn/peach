FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY . .
RUN npm ci

# Build and run in 1 step as the database needs to be available for the build
CMD npx turbo db:migrate && npx turbo build --filter=@peach/web... && npm run start -w @peach/web