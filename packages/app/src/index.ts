import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { serverConfig } from '@peach/backend';
import path from 'path';
import meow from 'meow';

const cli = meow(
  `
    Usage
      $ peach <input>
 
    Options
      --port, -p  Specify port to listen on, default: 3000
`,
  {
    flags: {
      port: {
        type: 'number',
        alias: 'p',
      },
    },
  },
);

const port = () => (process.env.PORT ? parseInt(process.env.PORT, 10) : cli.flags.port || 3000);

const app = express();
const server = new ApolloServer(serverConfig);

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

app.listen(port(), () => console.log(`🚀 Server ready at http://localhost:${port()}`));
