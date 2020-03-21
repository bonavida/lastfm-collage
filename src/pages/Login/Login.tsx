import React from 'react';
/** Components */
import Button from 'components/Button';
/** Styles */
import './Login.scss';

const Login = () => {
  const handleLogin = () => {
    console.log('login!');
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
      <Button className="login__button" onClick={() => handleLogin()}>
        Login to Last.fm
      </Button>
    </div>
  );
};

export default Login;
