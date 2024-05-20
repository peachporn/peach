import { settingsTypeDefs } from './schema/settings.gql';
import { settingsTasksTypeDefs } from './schema/settingsTasks.gql';
import { setupTypeDefs } from './schema/setup.gql';
import { updateSettingsTypeDefs } from './schema/updateSettings.gql';

import { settingsResolvers } from './resolver/settings';
import { settingsTasksResolvers } from './resolver/settingsTasks';
import { setupResolvers } from './resolver/setup';
import { updateSettingsResolvers } from './resolver/updateSettings';
import { volumesResolvers } from './resolver/volumes';

export const settingsDomainTypeDefs = [
  settingsTypeDefs,
  settingsTasksTypeDefs,
  setupTypeDefs,
  updateSettingsTypeDefs,
];

export const settingsDomainResolvers = [
  settingsResolvers,
  settingsTasksResolvers,
  setupResolvers,
  updateSettingsResolvers,
  volumesResolvers,
];
