import { Config } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './schema';
import { createContext } from './context';
import { resolvers as scalarResolvers, typeDefs as scalarTypedefs } from 'graphql-scalars'

export const serverConfig: Config = {
  typeDefs: [
    ...scalarTypedefs,
    ...typeDefs
  ],
  resolvers: [
    ...scalarTypedefs,
    ...resolvers,
  ],
  context: createContext(),
  introspection: true,
};
