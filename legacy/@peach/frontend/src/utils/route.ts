import { i } from '../i18n/i18n';

export const moviesRoute = '/movies';
export const actressesRoute = '/actresses';
export const websitesRoute = '/websites';
export const genresRoute = '/genres';
export const settingsRoute = '/settings';
export const tasksRoute = '/tasks';
export const homeRoute = '/';

export const movieDetailRoute = (movieId: number) => `${moviesRoute}/${movieId}`;

export const actressDetailRoute = (actressId: number) => `${actressesRoute}/${actressId}`;
export const actressEditRoute = (actressId: number) => `${actressesRoute}/${actressId}/edit`;
export const isActressEditRoute = (route: string) => route.match(/actresses\/.*\/edit/g);
export const actressUploadImageRoute = (id: number) => `/upload/actress/${id}`;

export const genreDetailRoute = (genreId: number) => `${genresRoute}/${genreId}`;
export const genreEditRoute = (genreId: number) => `${genresRoute}/${genreId}/edit`;
export const isGenreEditRoute = (route: string) => route.match(/genres\/.*\/edit/g);
export const genreUploadImageRoute = (id: number) => `/upload/genre/${id}`;

export const websiteDetailRoute = (websiteId: number) => `${websitesRoute}/${websiteId}`;
export const websiteEditRoute = (websiteId: number) => `${websitesRoute}/${websiteId}/edit`;
export const isWebsiteEditRoute = (route: string) => route.match(/websites\/.*\/edit/g);
export const websiteUploadImageRoute = (id: number) => `/upload/website/${id}`;

export const routes = [
  {
    url: moviesRoute,
    label: i('NAVIGATION_MOVIES'),
    icon: 'movie',
  },
  {
    url: actressesRoute,
    label: i('NAVIGATION_ACTRESSES'),
    icon: 'person_pin',
  },
  {
    url: websitesRoute,
    label: i('NAVIGATION_WEBSITES'),
    icon: 'cloud',
  },
  {
    url: genresRoute,
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
