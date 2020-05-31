import { h, render } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Home } from './pages/home';
import { client } from './apollo/client';

import '@peach/components/src/index.styl';

const App = (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

render(App, document.querySelector('#root') || document.body);
