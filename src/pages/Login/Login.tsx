import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Services */
import { login, getSession } from 'services/auth';
/** Components */
import Button from 'components/Button';
/** Types */
import { RootState } from 'store';
import { setTokenAction, AuthSliceState } from 'context/auth';
/** Utils */
import { retrieveLastfmToken, generateApiSignature } from 'utils';
/** Styles */
import './Login.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { token } = useSelector<RootState, AuthSliceState>(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const _token = retrieveLastfmToken(window.location.search);
      _token && dispatch(setTokenAction(_token));
    }
  }, [dispatch]);

  useEffect(() => {
    const getSessionKey = async (apiSig: string) => {
      try {
        const res = await getSession(token, apiSig);
        console.log(res);
        history.push('/');
      } catch (e) {
        console.error(e);
      }
    };
    if (token) {
      const apiSig = generateApiSignature(token);
      getSessionKey(apiSig);
    }
  }, [token, history]);

  const loginHandler = () => {
    login();
  };

  return (
    <div className="login__container">
      <span className="login__description">
        <p>
          <span className="login__description--bold">Last.fm Collage</span> is
          an application built with React and Electron that creates a collage
          with the cover art of your top favourite albums registered in your
          last.fm account.
        </p>
        <p>
          No personal information is used or stored. You only need to
          authenticate and give reading permissions with your last.fm account
          clicking in the button below.
        </p>
      </span>
      <Button className="login__button" onClick={loginHandler}>
        Login to Last.fm
      </Button>
    </div>
  );
};

export default Login;
