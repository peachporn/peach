import { FunctionalComponent, h } from 'preact';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { SetupStatusQuery } from '@peach/types';
import { i } from '../i18n/i18n';
import { settingsRoute } from '../utils/route';
import { setupStatusQuery } from '../queries/setupStatus.gql';

export const SetupChecker: FunctionalComponent = () => {
  const { data } = useQuery<SetupStatusQuery>(setupStatusQuery);
  const history = useHistory();
  const location = useLocation();

  if (data?.setupStatus === 'NoVolumes' && location.pathname !== settingsRoute) {
    toast(i('SETUP_NO_VOLUMES_FOUND'), {
      autoClose: false,
      onClick: () => {
        history.push(settingsRoute);
      },
    });
  }

  return null;
};
