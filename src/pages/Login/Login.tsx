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
      <Button className="login__button" onClick={() => handleLogin()}>
        Login to Last.fm
      </Button>
    </div>
  );
};

export default Login;
