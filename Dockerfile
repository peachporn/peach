FROM node:14-alpine

WORKDIR /usr/src/app

COPY yarn.lock .
COPY prisma .
COPY dist .

VOLUME /mnt/library
VOLUME /mnt/media

ENV DATABASE_URL="file:/mnt/library/peach.db"
ENV DATABASE_PATH="/mnt/library/peach.db"
ENV PORT=80

ENV DEFAULT_LIBRARY_PATH="/mnt/library"
ENV DEFAULT_VOLUME_PATH="/mnt/media"

RUN apk --update add ffmpeg openssl

RUN yarn
RUN yarn prisma generate
RUN cp node_modules/@prisma/engines/*-engine-* .
RUN cp node_modules/@prisma/engines/libquery_engine* . 2>/dev/null || :

EXPOSE 80

CMD yarn prisma migrate deploy && node app.js
