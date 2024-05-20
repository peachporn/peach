import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'preact/hooks';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { client } from './apollo-client.js';
import { MobileNavigation } from './components/mobileNavigation.js';
import { MovieFilterProvider } from './context/movieFilter.js';
import { SettingsProvider } from './context/settings/index.js';
import { ActressDetailPage } from './pages/actressDetail/index.js';
import { ActressesPage } from './pages/actressList/index.js';
import { GenreDetailPage } from './pages/genreDetail/index.js';
import { GenresPage } from './pages/genreList/index.js';
import { Homepage } from './pages/home/index.js';
import { MovieDetailPage } from './pages/movieDetail/index.js';
import { MoviesPage } from './pages/movieList/index.js';
import { SettingsPage } from './pages/settings/index.js';
import { TasksPage } from './pages/tasks/index.js';
import { WebsiteDetailPage } from './pages/websiteDetail/index.js';
import { WebsitesPage } from './pages/websiteList/index.js';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/movies/:movieId">
        <MovieDetailPage />
      </Route>
      <Route exact path="/movies">
        <MoviesPage />
      </Route>
      <Route exact path="/actresses/:actressId">
        <ActressDetailPage />
      </Route>
      <Route exact path="/actresses">
        <ActressesPage />
      </Route>
      <Route path="/settings">
        <SettingsPage />
      </Route>
      <Route path="/tasks">
        <TasksPage />
      </Route>
      <Route exact path="/genres/:genreId">
        <GenreDetailPage />
      </Route>
      <Route exact path="/genres">
        <GenresPage />
      </Route>
      <Route exact path="/websites/:websiteId">
        <WebsiteDetailPage />
      </Route>
      <Route exact path="/websites">
        <WebsitesPage />
      </Route>
      <Route path="/">
        <Homepage />
      </Route>
    </Switch>
  );
};

export const App = (
  <ApolloProvider client={client}>
    <SettingsProvider>
      <MovieFilterProvider>
        <Router>
          <AppContent />
          <MobileNavigation />
        </Router>
      </MovieFilterProvider>
    </SettingsProvider>
  </ApolloProvider>
);
