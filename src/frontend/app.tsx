import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from '../components';
import { Homepage } from './pages/home';
import { client } from './apollo-client';
import { SettingsPage } from './pages/settings';

import { SettingsProvider } from './context/settings';
import { MovieDetailPage } from './pages/movieDetail';
import { ActressDetailPage } from './pages/actressDetail';
import { MoviesPage } from './pages/movieList';
import { ActressesPage } from './pages/actressList';
import { GenresPage } from './pages/genreList';
import { GenreDetailPage } from './pages/genreDetail';

import '../components/index.styl';

const App = (
  <ApolloProvider client={client}>
    <SettingsProvider>
      <Router>
        <Switch>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route exact path="/movies/:movieId">
            <MovieDetailPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/actresses">
            <ActressesPage />
          </Route>
          <Route exact path="/actresses/:actressId">
            <ActressDetailPage />
          </Route>
          <Route exact path="/actresses/:actressId/edit">
            <ActressDetailPage />
          </Route>
          <Route exact path="/genres">
            <GenresPage />
          </Route>
          <Route exact path="/genres/:genreId">
            <GenreDetailPage />
          </Route>
          <Route exact path="/genres/:genreId/edit">
            <GenreDetailPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" newestOnTop />
      </Router>
    </SettingsProvider>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);
