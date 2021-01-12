import { actressTypeDefs } from './schema/actress.gql';
import { updateActressTypeDefs } from './schema/updateActress.gql';
import { createActressTypeDefs } from './schema/createActress.gql';

import { actressResolvers } from './resolver/actress';
import { createActressResolvers } from './resolver/createActress';
import { updateActressResolvers } from './resolver/updateActress';

export const actressDomainTypeDefs = [
  actressTypeDefs,
  updateActressTypeDefs,
  createActressTypeDefs,
];

export const actressDomainResolvers = [
  actressResolvers,
  createActressResolvers,
  updateActressResolvers,
];
