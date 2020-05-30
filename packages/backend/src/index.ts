import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './schema';
import { createContext } from './context';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext(),
  introspection: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
