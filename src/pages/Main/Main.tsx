import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Types and Actions */
import { RootState } from 'store';
import { AuthSliceState } from 'context/auth';
import { fetchUser } from 'context/user';
import { fetchTopAlbums, AlbumsSliceState } from 'context/albums';

const Main = () => {
  const { sessionKey } = useSelector<RootState, AuthSliceState>(
    state => state.auth
  );
  const { albums, loading } = useSelector<RootState, AlbumsSliceState>(
    state => state.albums
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      await dispatch(fetchUser());
      dispatch(fetchTopAlbums({ period: 'overall', limit: 150 }));
    };
    if (sessionKey) {
      getUser();
    }
  }, [sessionKey, dispatch]);

  return (
    <div>
      Main
      {loading && <div>Fetching albums...</div>}
      {!loading && !!albums.length && <div>Albums: {albums.length}</div>}
    </div>
  );
};

export default Main;
