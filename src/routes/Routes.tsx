import React from 'react';
import { Switch, Route } from 'react-router-dom';
/** Components */
import Layout from 'components/Layout';
import ProtectedRoute from './ProtectedRoute';
/** Config */
import { routes, protectedRoutes } from './config';

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
      {/* Protected routes */}
      {Array.isArray(protectedRoutes) &&
        protectedRoutes.map(route => {
          const { id, path, exact, RouteComponent } = route;
          return (
            <ProtectedRoute
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
