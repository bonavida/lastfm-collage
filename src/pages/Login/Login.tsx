import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
/** Services */
import { login } from 'services/auth';
/** Components */
import Button from 'components/Button';
/** Types */
import { RootState } from 'store';
import { AuthSliceState, setTokenAction, fetchSession } from 'context/auth';
/** Utils */
import { retrieveLastfmToken, generateApiSignature } from 'utils';
/** Styles */
import './Login.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { token, session, authPending } = useSelector<
    RootState,
    AuthSliceState
  >(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const _token = retrieveLastfmToken(window.location.search);
      _token && dispatch(setTokenAction(_token));
    }
  }, [dispatch]);

  useEffect(() => {
    const getSession = async (apiSig: string) => {
      try {
        dispatch(fetchSession(apiSig));
      } catch (e) {
        console.error(e);
      }
    };
    if (token) {
      const apiSig = generateApiSignature(token);
      getSession(apiSig);
    }
  }, [token]);

  useEffect(() => {
    if (session.key) {
      history.push('/');
    }
  }, [session.key, history]);

  const loginHandler = () => {
    login();
  };

  return (
    <div className="login__container">
      {!session.key && !authPending && (
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
      {authPending && 'Loading...'}
    </div>
  );
};

export default Login;
