import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// route components
import App from './components/App';
import AddressFinder from './components/AddressFinder';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={AddressFinder} />
      <Route path="finder" component={AddressFinder}/>
    </Route>
  </Router>
);
