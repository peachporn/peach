import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

export const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: false,
  }),
  introspection: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
