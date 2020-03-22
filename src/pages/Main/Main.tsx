import React from 'react';
import { useSelector } from 'react-redux';
/** Types */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';

const Main = () => {
  const { token } = useSelector<RootState, AuthSliceState>(state => state.auth);

  return (
    <div>
      <div>Main</div>
      {token && <span>isAuthenticated!</span>}
    </div>
  );
};

export default Main;
