import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Services */
import { login } from 'services/auth';
/** Components */
import Button from 'components/Button';
/** Types and Actions */
import { RootState } from 'store';
import { AuthSliceState, setTokenAction, fetchSession } from 'context/auth';
/** Utils */
import { retrieveLastfmToken } from 'utils';
/** Styles */
import './Login.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { token, sessionKey, loading } = useSelector<RootState, AuthSliceState>(
    state => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const _token = retrieveLastfmToken(window.location.search);
      _token && dispatch(setTokenAction(_token));
    }
  }, [dispatch]);

  useEffect(() => {
    const getSession = async () => {
      try {
        await dispatch(fetchSession());
        history.push('/');
      } catch (e) {
        console.error(e);
      }
    };
    if (token) {
      getSession();
    }
  }, [token, dispatch, history]);

  const loginHandler = () => {
    login();
  };

  return (
    <div className="login__container">
      {!sessionKey && !loading && (
        <>
          <span className="login__description">
            <p>
              <span className="login__description--bold">Last.fm Collage</span>{' '}
              is an application built with React and Electron that creates a
              collage with the cover art of your top favourite albums registered
              in your last.fm account.
            </p>
            <p>
              No personal information is used or stored. You only need to
              authenticate and give reading permissions with your last.fm
              account clicking in the button below.
            </p>
          </span>
          <Button className="login__button" onClick={loginHandler}>
            Login to Last.fm
          </Button>
        </>
      )}
      {loading && 'Loading...'}
    </div>
  );
};

export default Login;
