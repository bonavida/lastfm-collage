import React from 'react';
import { useSelector } from 'react-redux';
/** Types */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';

const Main = () => {
  const { session } = useSelector<RootState, AuthSliceState>(
    state => state.auth
  );

  return (
    <div>
      <div>Main</div>
      {session.key && <span>isAuthenticated!</span>}
    </div>
  );
};

export default Main;
