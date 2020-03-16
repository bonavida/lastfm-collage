import React from 'react';
import { Switch, Route } from 'react-router-dom';
/** Components */
import Layout from 'components/Layout';
/** Config */
import { routes } from './config';

export const Routes = () => (
  <Switch>
    <Layout>
      {/* Routes */}
      {Array.isArray(routes) &&
        routes.map(route => {
          const { id, path, exact, RouteComponent } = route;
          return (
            <Route
              key={id}
              path={path}
              exact={exact}
              component={RouteComponent}
            />
          );
        })}
    </Layout>
  </Switch>
);
