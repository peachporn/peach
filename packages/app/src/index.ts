import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
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

const app = fastify({ logger: { prettyPrint: true } });
const server = new ApolloServer(serverConfig);

app.register(server.createHandler());

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '../../frontend/dist'),
});

app.listen(port(), err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
