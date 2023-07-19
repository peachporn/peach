import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'preact/hooks';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { client } from './apollo-client.js';
import { MobileNavigation } from './components/mobileNavigation';
import { MovieFilterProvider } from './context/movieFilter';
import { SettingsProvider } from './context/settings';
import { ActressDetailPage } from './pages/actressDetail';
import { ActressesPage } from './pages/actressList';
import { GenreDetailPage } from './pages/genreDetail';
import { GenresPage } from './pages/genreList';
import { Homepage } from './pages/home';
import { MovieDetailPage } from './pages/movieDetail';
import { MoviesPage } from './pages/movieList';
import { SettingsPage } from './pages/settings';
import { TasksPage } from './pages/tasks';
import { WebsiteDetailPage } from './pages/websiteDetail';
import { WebsitesPage } from './pages/websiteList';

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
