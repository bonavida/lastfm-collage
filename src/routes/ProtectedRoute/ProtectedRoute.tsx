import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
/** Types */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';

type ProtectedRouteProps = {
  path: string;
  exact: boolean;
  component: React.FC<RouteComponentProps>;
};

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
const ProtectedRoute = ({
  path,
  exact,
  component: Component,
}: ProtectedRouteProps) => {
  const { token } = useSelector<RootState, AuthSliceState>(state => state.auth);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
