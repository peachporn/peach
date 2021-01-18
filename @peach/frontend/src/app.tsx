import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Homepage } from './pages/home';
import { client } from './apollo-client.js';
import { SettingsPage } from './pages/settings';
import { SettingsProvider } from './context/settings';
import { GenresPage } from './pages/genreList';
import { MobileNavigation } from './components/mobileNavigation';
/*
import { SettingsPage } from './pages/settings';
import { SettingsProvider } from './context/settings';
import { MovieDetailPage } from './pages/movieDetail';
import { ActressDetailPage } from './pages/actressDetail';
import { MoviesPage } from './pages/movieList';
import { ActressesPage } from './pages/actressList';
import { GenresPage } from './pages/genreList';
import { GenreDetailPage } from './pages/genreDetail';
import { TasksPage } from './pages/tasks';


const App = (
  <ApolloProvider client={client}>
      <Router>
        <Switch>
          {/*}
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route exact path="/movies/:movieId">
            <MovieDetailPage />
          </Route>
          <Route path="/tasks">
            <TasksPage />
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
          <Route exact path="/genres/:genreId">
            <GenreDetailPage />
          </Route>
          <Route exact path="/genres/:genreId/edit">
            <GenreDetailPage />
          </Route>
        </Switch>
      </Router>
        <ToastContainer position="bottom-right" newestOnTop />
    </SettingsProvider>
  </ApolloProvider>
);
 */

const App = (
  <ApolloProvider client={client}>
    <SettingsProvider>
      <Router>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/genres">
            <GenresPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
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
