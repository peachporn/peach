import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { Homepage } from './pages/home';
import { client } from './apollo-client.js';
import { SettingsPage } from './pages/settings';
import { SettingsProvider } from './context/settings';
import { GenresPage } from './pages/genreList';
import { MobileNavigation } from './components/mobileNavigation';
import { ActressesPage } from './pages/actressList';
import { WebsitesPage } from './pages/websiteList';
import { TasksPage } from './pages/tasks';
import { MoviesPage } from './pages/movieList';
import { GenreDetailPage } from './pages/genreDetail';
import { WebsiteDetailPage } from './pages/websiteDetail';
import { ActressDetailPage } from './pages/actressDetail';
import { MovieDetailPage } from './pages/movieDetail';

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

const App = (
  <ApolloProvider client={client}>
    <SettingsProvider>
      <Router>
        <AppContent />
        <MobileNavigation />
      </Router>
    </SettingsProvider>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((import.meta as any).hot) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (import.meta as any).hot.accept();
}
