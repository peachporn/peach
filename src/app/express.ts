import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import { serverConfig } from '../backend';
import { fromEnv } from '../utils/env';

export const startServer = () => {
  const port = () => (fromEnv('PORT') ? parseInt(fromEnv('PORT'), 10) : 3000);

  const server = new ApolloServer(serverConfig);
  const app = express();

  server.applyMiddleware({ app });

  const frontendDistPath = path.resolve('./frontend');

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/assets')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));

    return null;
  });

  app.use('/assets', express.static(frontendDistPath));

  app.listen(port(), () => console.info(`🚀 Server ready at http://localhost:${port()}`));
};
