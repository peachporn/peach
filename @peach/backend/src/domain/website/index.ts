import { websiteTypeDefs } from './schema/website.gql';
import { createWebsiteTypeDefs } from './schema/createWebsite.gql';

import { websiteResolvers } from './resolver/website';
import { createWebsiteResolvers } from './resolver/createWebsite';

export const websiteDomainTypeDefs = [websiteTypeDefs, createWebsiteTypeDefs];

export const websiteDomainResolvers = [websiteResolvers, createWebsiteResolvers];
