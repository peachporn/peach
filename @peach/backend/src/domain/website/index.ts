import { websiteTypeDefs } from './schema/website.gql';
import { createWebsiteTypeDefs } from './schema/createWebsite.gql';

import { websiteResolvers } from './resolver/website';
import { createWebsiteResolvers } from './resolver/createWebsite';
import { updateWebsiteTypeDefs } from './schema/updateWebsite.gql';
import { updateWebsiteResolvers } from './resolver/updateWebsite';

export const websiteDomainTypeDefs = [
  websiteTypeDefs,
  createWebsiteTypeDefs,
  updateWebsiteTypeDefs,
];

export const websiteDomainResolvers = [
  websiteResolvers,
  createWebsiteResolvers,
  updateWebsiteResolvers,
];
