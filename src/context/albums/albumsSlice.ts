import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/** Services */
import { getUserTopAlbums } from 'services/lastfm';
/** Types */
import { Filters } from 'models/lastfm';
import { Album } from 'models/album';
/** Actions */
import { RootState } from 'store';
/** Utils */
import { parseTopAlbums } from 'utils';

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
  Filters,
  { state: RootState }
>('albums/fetchTopAlbums', async (filters: Filters, { getState }) => {
  const { sessionKey } = getState().auth;
  const { name: username } = getState().user;
  let albums: Album[] = [];
  const currFilters = {
    page: 1,
    limit: filters.limit,
  };
  do {
    const remaining = filters.limit - albums.length;
    const topalbums = await getUserTopAlbums(username, sessionKey, currFilters);
    const filteredAlbums = parseTopAlbums(topalbums.album).slice(0, remaining);
    albums = [...albums, ...filteredAlbums];
    if (parseInt(topalbums['@attr'].total, 2) < filters.limit) break;
    currFilters.page++;
  } while (albums.length < filters.limit);
  return albums as Album[];
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
