import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { toast } from '@peach/components';
import { useHistory, useLocation } from 'react-router-dom';
import { SetupContext } from '../context/setup';
import { SetupStatus } from '../generated/types';
import { i } from '../i18n/i18n';
import { settingsRoute } from '../utils/route';

export const SetupChecker: FunctionalComponent = () => {
  const setupStatus = useContext(SetupContext);
  const history = useHistory();
  const location = useLocation();

  if (setupStatus === SetupStatus.NoVolumes && location.pathname !== settingsRoute) {
    toast(i('SETUP_NO_VOLUMES_FOUND'), {
      autoClose: false,
      onClick: () => {
        history.push(settingsRoute);
      },
    });
  }

  return null;
};
