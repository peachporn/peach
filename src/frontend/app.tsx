import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from '../components';
import { Homepage } from './pages/home';
import { client } from './apollo-client';
import { SetupChecker } from './components/setupChecker';
import { SettingsPage } from './pages/settings';
import { MoviesPage } from './pages/movies';

import '../components/index.styl';
import { SettingsProvider } from './context/settings';
import { MovieDetailPage } from './pages/movieDetail';

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
          <Route path="/movies/:movieId/edit">Movie Edit</Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" newestOnTop />
        <SetupChecker />
      </Router>
    </SettingsProvider>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);