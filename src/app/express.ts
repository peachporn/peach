import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import { serverConfig } from '../backend';
import { fromEnv } from '../utils/env';
import { getScreencapPath } from '../domain/settings';
import { serveScreencaps } from './serve/screencaps';
import { serveMovies } from './serve/movies';
import { serveActressImages } from './serve/actress-images';

export const startServer = () => {
  const port = () => (fromEnv('PORT') ? parseInt(fromEnv('PORT'), 10) : 3000);

  const server = new ApolloServer(serverConfig);
  const app = express();

  server.applyMiddleware({ app });

  const frontendDistPath = path.resolve('./frontend');

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/assets') || req.url.startsWith('/screencaps')) {
      return next();
    }

    res.sendFile(path.join(frontendDistPath, 'index.html'));

    return null;
  });

  app.get('/assets/actress/:actressId*', serveActressImages);
  app.get('/assets/screencaps/:movieId*', serveScreencaps);
  app.get('/assets/movie/:movieId', serveMovies);
  app.use('/assets', express.static(frontendDistPath));

  app.listen(port(), () => console.info(`🚀 Server ready at http://localhost:${port()}`));
};
