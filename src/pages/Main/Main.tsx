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
  const { albums } = useSelector<RootState, AlbumsSliceState>(
    state => state.albums
  );
  const dispatch = useDispatch();

  if (albums.length) {
    albums.forEach(album => {
      // TODO: Remove albums with no cover and get more
      if (!album.image) console.log(album.name);
    });
  }

  useEffect(() => {
    const getUser = async () => {
      await dispatch(fetchUser());
      await dispatch(fetchTopAlbums({ period: 'overall', limit: 150 }));
    };
    if (sessionKey) {
      getUser();
    }
  }, [sessionKey]);

  return <div>Main</div>;
};

export default Main;
