FROM node:12-alpine

WORKDIR /usr/src/app

COPY prisma .
COPY dist .

VOLUME /mnt/library
VOLUME /mnt/media

ENV DATABASE_URL="file:/mnt/library/peach.db"
ENV DATABASE_PATH="/mnt/library/peach.db"
ENV PORT=80

ENV DEFAULT_LIBRARY_PATH="/mnt/library"
ENV DEFAULT_VOLUME_PATH="/mnt/media"

RUN apk add --no-cache ffmpeg

RUN yarn
RUN yarn prisma generate
RUN cp node_modules/@prisma/engines/*-engine-* .

EXPOSE 80

CMD yarn prisma migrate deploy && node app.js
