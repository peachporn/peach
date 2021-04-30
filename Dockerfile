FROM node:13-alpine

WORKDIR /usr/src/app

COPY dist .

ENV DATABASE_URL="file:./database.db"
ENV DATABASE_PATH="./database.db"
ENV PORT="80"

RUN apk add  --no-cache ffmpeg

RUN yarn
RUN yarn prisma generate
RUN cp node_modules/@prisma/engines/*-engine-* .

EXPOSE 80

CMD node app.js
