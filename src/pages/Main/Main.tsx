import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Types and Actions */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';
import { fetchUser, UserSliceState } from 'context/user';

const Main = () => {
  const { session } = useSelector<RootState, AuthSliceState>(
    state => state.auth
  );
  const { user } = useSelector<RootState, UserSliceState>(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session.key) {
      dispatch(fetchUser());
    }
  }, [session.key]);

  return (
    <div>
      <div>Main</div>
      {user.name && <span>{user.name}</span>}
    </div>
  );
};

export default Main;
