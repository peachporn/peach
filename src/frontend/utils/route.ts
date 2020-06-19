import { RouteDefinition } from '../../components';
import { i } from '../i18n/i18n';

export const settingsRoute = '/settings';

export const movieDetailRoute = (movieId: number) => `/movies/${movieId}`;

export const routes: RouteDefinition[] = [
  {
    url: '/movies',
    label: i('NAVIGATION_MOVIES'),
    icon: 'movie',
  },
  {
    url: '/actresses',
    label: i('NAVIGATION_ACTRESSES'),
    icon: 'person_pin',
  },
  {
    url: '/websites',
    label: i('NAVIGATION_WEBSITES'),
    icon: 'cloud',
  },
  {
    url: '/genres',
    label: i('NAVIGATION_GENRES'),
    icon: 'local_offer',
  },
  {
    url: settingsRoute,
    label: i('NAVIGATION_SETTINGS'),
    icon: 'settings',
  },
];
