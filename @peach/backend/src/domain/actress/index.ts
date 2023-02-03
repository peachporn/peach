import { actressResolvers } from './resolver/actress';
import { actressCountResolvers } from './resolver/actressCount';
import { actressesResolvers } from './resolver/actresses';
import { createActressResolvers } from './resolver/createActress';
import { generateSlugsResolver } from './resolver/generateSlugs';
import { scrapeActressResolvers } from './resolver/scrapeActress';
import { updateActressResolvers } from './resolver/updateActress';
import { actressTypeDefs } from './schema/actress.gql';
import { actressCountTypeDefs } from './schema/actressCount.gql';
import { actressesTypeDefs } from './schema/actresses.gql';
import { actressAppearanceTypeDefs } from './schema/appearance.gql';
import { createActressTypeDefs } from './schema/createActress.gql';
import { generateSlugsTypeDefs } from './schema/generateSlugs.gql';
import { scrapeActressTypeDefs } from './schema/scrapeActress.gql';
import { updateActressTypeDefs } from './schema/updateActress.gql';

export const actressDomainTypeDefs = [
  actressAppearanceTypeDefs,
  actressCountTypeDefs,
  actressTypeDefs,
  actressesTypeDefs,
  createActressTypeDefs,
  generateSlugsTypeDefs,
  scrapeActressTypeDefs,
  updateActressTypeDefs,
];

export const actressDomainResolvers = [
  actressResolvers,
  actressesResolvers,
  actressCountResolvers,
  createActressResolvers,
  generateSlugsResolver,
  scrapeActressResolvers,
  updateActressResolvers,
];
