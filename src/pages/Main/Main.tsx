import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Types and Actions */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';
import { fetchUser, UserSliceState } from 'context/user';
import { fetchTopAlbums } from 'context/albums';

const Main = () => {
  const { sessionKey } = useSelector<RootState, AuthSliceState>(
    state => state.auth
  );
  const { name } = useSelector<RootState, UserSliceState>(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      await dispatch(fetchUser());
      await dispatch(fetchTopAlbums());
    };
    if (sessionKey) {
      getUser();
    }
  }, [sessionKey]);

  return (
    <div>
      <div>Main</div>
      {name && <span>{name}</span>}
    </div>
  );
};

export default Main;
