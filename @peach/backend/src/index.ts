import { Config } from 'apollo-server';
import { createContext } from './context';
import { actressDomainResolvers, actressDomainTypeDefs } from './domain/actress';
import { genreDomainResolvers, genreDomainTypeDefs } from './domain/genre';
import { movieDomainResolvers, movieDomainTypeDefs } from './domain/movie';
import { settingsDomainResolvers, settingsDomainTypeDefs } from './domain/settings';
import { tasksDomainResolvers, tasksDomainTypeDefs } from './domain/tasks';
import { websiteDomainResolvers, websiteDomainTypeDefs } from './domain/website';

const resolvers = [
  ...actressDomainResolvers,
  ...genreDomainResolvers,
  ...websiteDomainResolvers,
  ...movieDomainResolvers,
  ...settingsDomainResolvers,
  ...tasksDomainResolvers,
];

const typeDefs = [
  ...actressDomainTypeDefs,
  ...genreDomainTypeDefs,
  ...websiteDomainTypeDefs,
  ...movieDomainTypeDefs,
  ...settingsDomainTypeDefs,
  ...tasksDomainTypeDefs,
];

export const serverConfig: Config = {
  typeDefs,
  resolvers,
  context: createContext(),
  introspection: true,
};
