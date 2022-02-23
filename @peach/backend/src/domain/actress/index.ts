import { actressTypeDefs } from './schema/actress.gql';
import { actressAppearanceTypeDefs } from './schema/appearance.gql';
import { updateActressTypeDefs } from './schema/updateActress.gql';
import { createActressTypeDefs } from './schema/createActress.gql';
import { scrapeActressTypeDefs } from './schema/scrapeActress.gql';
import { generateSlugsTypeDefs } from './schema/generateSlugs.gql';

import { actressResolvers } from './resolver/actress';
import { createActressResolvers } from './resolver/createActress';
import { updateActressResolvers } from './resolver/updateActress';
import { scrapeActressResolvers } from './resolver/scrapeActress';
import { generateSlugsResolver } from './resolver/generateSlugs';

export const actressDomainTypeDefs = [
  actressAppearanceTypeDefs,
  actressTypeDefs,
  updateActressTypeDefs,
  createActressTypeDefs,
  scrapeActressTypeDefs,
  generateSlugsTypeDefs,
];

export const actressDomainResolvers = [
  actressResolvers,
  createActressResolvers,
  updateActressResolvers,
  scrapeActressResolvers,
  generateSlugsResolver,
];
