import gql from 'graphql-tag';
import { settingsFragment } from '../queries/settingsFragment.gql';

export const updateSettingsMutation = gql`
  mutation UpdateSettings($data: UpdateSettingsInput!) {
    updateSettings(data: $data) {
      ...Settings
    }
  }

  ${settingsFragment}
`;
