import { i } from '../i18n/i18n';

export const settingsRoute = '/settings';
export const tasksRoute = '/tasks';

export const homeRoute = '/';

export const movieDetailRoute = (movieId: number) => `/movies/${movieId}`;

export const actressDetailRoute = (actressId: number) => `/actresses/${actressId}`;
export const actressEditRoute = (actressId: number) => `/actresses/${actressId}/edit`;
export const isActressEditRoute = (route: string) => route.match(/actresses\/.*\/edit/g);
export const actressUploadImageRoute = (id: number) => `/upload/actress/${id}`;

export const genreDetailRoute = (genreId: number) => `/genres/${genreId}`;
export const genreEditRoute = (genreId: number) => `/genres/${genreId}/edit`;
export const isGenreEditRoute = (route: string) => route.match(/genres\/.*\/edit/g);
export const genreUploadImageRoute = (id: number) => `/upload/genre/${id}`;

export const routes = [
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
  {
    url: tasksRoute,
    label: i('NAVIGATION_TASKS'),
    icon: 'settings',
  },
];
