import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { serverConfig } from '@peach/backend';
import path from 'path';
import { cli } from './cli';

export const startServer = () => {
  const port = () => (process.env.PORT ? parseInt(process.env.PORT, 10) : cli.flags.port || 3000);

  const server = new ApolloServer(serverConfig);
  const app = express();

  server.applyMiddleware({ app });

  const frontendDistPath = path.join(`${__dirname}/../../frontend/dist`);

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
