import path from 'path';
import { serverConfig } from '@peach/backend';
import { fromEnv } from '@peach/utils/src/env';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { serveActressImages } from './serve/actress-images';
import { applyFileUploadMiddleware } from './serve/file-upload';
import { serveGenreImages } from './serve/genre-images';
import { serveMovies } from './serve/movies';

import { serveScreencaps } from './serve/screencaps';
import { serveWebsiteImages } from './serve/website-images';

const topLevelRoutes = ['/movies', '/actresses', '/websites', '/genres', '/settings', '/tasks'];

export const startServer = () => {
  const port = () => (fromEnv('PORT') ? parseInt(fromEnv('PORT'), 10) : 3000);

  const server = new ApolloServer(serverConfig);
  const app = express();

  app.use(bodyParser.json());

  applyFileUploadMiddleware(app);

  server.applyMiddleware({ app });

  const frontendDistPath = path.resolve('./frontend');

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/assets') || req.url.startsWith('/screencaps')) {
      return next();
    }

    if (topLevelRoutes.some(r => req.path.startsWith(r))) {
      res.sendFile(path.join(frontendDistPath, 'index.html'));
    } else {
      res.sendFile(path.join(frontendDistPath, req.path));
    }

    return null;
  });

  app.get('/assets/actress/:actressId*', serveActressImages);
  app.get('/assets/genre/:genreId*', serveGenreImages);
  app.get('/assets/website/:websiteId*', serveWebsiteImages);
  app.get('/assets/screencaps/:movieId*', serveScreencaps);
  app.get('/assets/movie/:movieId', serveMovies);
  app.use('/assets', express.static(frontendDistPath));

  app.listen(port(), () => console.info(`🚀 Server ready at http://localhost:${port()}`));
};
