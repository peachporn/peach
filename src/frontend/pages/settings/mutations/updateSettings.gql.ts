import { gql } from 'apollo-boost';

export const updateSettingsMutation = gql`
  mutation UpdateSettings($data: UpdateSettingsInput!) {
    updateSettings(data: $data) {
      language
      inferMovieTitle
      screencapPath
      actressImagePath
      genreImagePath
    }
  }
`;
