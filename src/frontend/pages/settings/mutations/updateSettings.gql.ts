import gql from 'graphql-tag';

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
