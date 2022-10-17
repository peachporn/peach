FROM node:16-slim

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

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y ffmpeg openssl

# --- Install Chromium for Puppeteer ---
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN yarn \
    && cd node_modules/puppeteer && node install.js && cd ../.. \
    && groupadd -r peachuser \
    && useradd -r -g peachuser -G audio,video peachuser \
    && mkdir -p /home/peachuser/Downloads \
    && chown -R peachuser:peachuser . \
    && chown -R peachuser:peachuser /home/peachuser

USER peachuser

RUN yarn prisma generate
RUN cp node_modules/@prisma/engines/*-engine-* .
RUN cp node_modules/@prisma/engines/libquery_engine* . 2>/dev/null || :

EXPOSE 80

CMD yarn prisma migrate deploy && node app.js
