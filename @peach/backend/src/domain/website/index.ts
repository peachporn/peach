import { actressTypeDefs } from './schema/actress.gql';
import { updateActressTypeDefs } from './schema/updateActress.gql';
import { createActressTypeDefs } from './schema/createActress.gql';
import { scrapeActressTypeDefs } from './schema/scrapeActress.gql';

import { actressResolvers } from './resolver/actress';
import { createActressResolvers } from './resolver/createActress';
import { updateActressResolvers } from './resolver/updateActress';
import { scrapeActressResolvers } from './resolver/scrapeActress';

export const actressDomainTypeDefs = [
  actressTypeDefs,
  updateActressTypeDefs,
  createActressTypeDefs,
  scrapeActressTypeDefs,
];

export const actressDomainResolvers = [
  actressResolvers,
  createActressResolvers,
  updateActressResolvers,
  scrapeActressResolvers,
];
