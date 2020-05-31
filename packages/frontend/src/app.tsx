import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from '@peach/components';
import { Home } from './pages/home';
import { client } from './apollo-client';
import { SetupChecker } from './components/setupChecker';
import { SettingsPage } from './pages/settings';

import '@peach/components/src/index.styl';
import { SettingsProvider } from './context/settings';

const App = (
  <ApolloProvider client={client}>
    <SettingsProvider>
      <Router>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" newestOnTop />
        <SetupChecker />
      </Router>
    </SettingsProvider>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);
