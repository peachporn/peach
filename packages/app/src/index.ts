import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';

import { serverConfig } from '@peach/backend';

const app = fastify({ logger: true });
const server = new ApolloServer(serverConfig);

app.register(server.createHandler());

app.listen(3000, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
