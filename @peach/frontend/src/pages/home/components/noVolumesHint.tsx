import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'react-router-dom';
import { i } from '../../../i18n/i18n';
import { settingsRoute } from '../../../utils/route';

export const NoVolumesHint: FunctionalComponent = () => (
  <Fragment>
    <h3 className="text-center text-lg">{i('HOMEPAGE_NO_MOVIES')}</h3>
    <span>
      {i('HOMEPAGE_GO_TO_SETTINGS1')}
      <Link className="text-pink" to={settingsRoute}>
        {i('HOMEPAGE_SETTINGS_PAGE')}
      </Link>
      {i('HOMEPAGE_GO_TO_SETTINGS2')}
    </span>
  </Fragment>
);
