import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { ScheduleContainer } from '../schedule';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={ScheduleContainer} path={APP_KEYS.ROUTER_KEYS.ROOT} />
    </Switch>
  </Router>
);
