import { Config } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './schema';
import { createContext } from './context';

export const serverConfig: Config = {
  typeDefs,
  resolvers,
  context: createContext(),
  introspection: true,
};
