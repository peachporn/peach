import { ApolloServer } from 'apollo-server';
import { serverConfig } from './index';

const server = new ApolloServer(serverConfig);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
