import { createWebsiteResolvers } from './resolver/createWebsite';
import { updateWebsiteResolvers } from './resolver/updateWebsite';

import { websiteResolvers } from './resolver/website';
import { websiteCountResolvers } from './resolver/websiteCount';
import { websitesResolvers } from './resolver/websites';
import { createWebsiteTypeDefs } from './schema/createWebsite.gql';
import { updateWebsiteTypeDefs } from './schema/updateWebsite.gql';
import { websiteTypeDefs } from './schema/website.gql';
import { websiteCountTypeDefs } from './schema/websiteCount.gql';
import { websitesTypeDefs } from './schema/websites.gql';

export const websiteDomainTypeDefs = [
  websiteTypeDefs,
  websitesTypeDefs,
  websiteCountTypeDefs,
  createWebsiteTypeDefs,
  updateWebsiteTypeDefs,
];

export const websiteDomainResolvers = [
  websiteResolvers,
  websitesResolvers,
  websiteCountResolvers,
  createWebsiteResolvers,
  updateWebsiteResolvers,
];
