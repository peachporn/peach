import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { serverConfig } from '@peach/backend';
import path from 'path';

const app = fastify({ logger: { prettyPrint: true } });
const server = new ApolloServer(serverConfig);

app.register(server.createHandler());

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '../../frontend/dist'),
});

app.listen(3000, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
