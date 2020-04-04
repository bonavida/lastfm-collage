import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/** Services */
import { getUserTopAlbums } from 'services/lastfm';
/** Types */
import { ResponseAlbum, Filters } from 'models/lastfm';
import { Album } from 'models/album';
/** Actions */
import { RootState } from 'store';
/** Utils */
import { getLargestImage } from 'utils';

export type AlbumsSliceState = {
  albums: Album[];
  loading: boolean;
};

const initialState: AlbumsSliceState = {
  albums: [],
  loading: false,
};

export const fetchTopAlbums = createAsyncThunk<
  ResponseAlbum[],
  Filters,
  { state: RootState }
>('albums/fetchTopAlbums', async (filters: Filters, { getState }) => {
  const { sessionKey } = getState().auth;
  const { name: username } = getState().user;
  const topalbums = await getUserTopAlbums(username, sessionKey, filters);
  return topalbums.album as ResponseAlbum[];
});

const albumsSlice = createSlice({
  name: 'albums',
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
      (state: AlbumsSliceState, action: PayloadAction<ResponseAlbum[]>) => {
        state.albums = action.payload.map(album => ({
          ...album,
          artist: album.artist?.name,
          image: getLargestImage(album.image)['#text'] || '',
        }));
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
