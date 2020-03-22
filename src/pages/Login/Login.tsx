import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/** Services */
import { login } from 'services/auth';
/** Components */
import Button from 'components/Button';
/** Types */
import { RootState } from 'store';
import { setTokenAction, AuthSliceState } from 'context/auth';
/** Styles */
import './Login.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { token } = useSelector<RootState, AuthSliceState>(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const _token = searchParams.get('token');
      _token && dispatch(setTokenAction(_token));
    }
  }, []);

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

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
