import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from '@peach/components';
import { Home } from './pages/home';
import { client } from './apollo/client';

import '@peach/components/src/index.styl';
import { SetupProvider } from './context/settings';
import { SetupChecker } from './components/setupChecker';

const App = (
  <ApolloProvider client={client}>
    <SetupProvider>
      <Router>
        <Switch>
          <Route path="/settings">
            Settings
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" newestOnTop />
        <SetupChecker />
      </Router>
    </SetupProvider>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);
