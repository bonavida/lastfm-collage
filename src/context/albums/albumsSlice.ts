import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/** Services */
import { getUserTopAlbums } from 'services/lastfm';
/** Types */
import { Album } from 'models/lastfm';
/** Actions */
import { RootState } from 'store';

export type AlbumsSliceState = {
  albums: Album[];
  loading: boolean;
};

const initialState: AlbumsSliceState = {
  albums: [],
  loading: false,
};

export const fetchTopAlbums = createAsyncThunk<
  Album[],
  void,
  { state: RootState }
>('albums/fetchTopAlbums', async (_, { getState }) => {
  const {
    session: { key: sessionKey },
  } = getState().auth;
  const {
    user: { name: username },
  } = getState().user;
  const topalbums = await getUserTopAlbums(username, sessionKey, {});
  return topalbums.album as Album[];
});

const albumsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAlbums: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchTopAlbums.pending, (state: AlbumsSliceState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTopAlbums.fulfilled,
      (state: AlbumsSliceState, action: PayloadAction<Album[]>) => {
        state.albums = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchTopAlbums.rejected, (state: AlbumsSliceState) => {
      state.albums = [];
      state.loading = false;
    });
  },
});

export const { clearAlbums } = albumsSlice.actions;

export default albumsSlice.reducer;
