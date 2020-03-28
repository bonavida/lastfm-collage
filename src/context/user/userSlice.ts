import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/** Services */
import { getUser } from 'services/lastfm';
/** Types */
import { User } from 'models/lastfm';
/** Actions */
import { RootState } from 'store';
/** Utils */
import { getLargestImage } from 'utils';

export type UserSliceState = {
  name: string;
  realname: string;
  url: string;
  image: string;
  loading: boolean;
};

const initialState: UserSliceState = {
  name: '',
  realname: '',
  url: '',
  image: '',
  loading: false,
};

export const fetchUser = createAsyncThunk<User, void, { state: RootState }>(
  'user/fetchUser',
  async (_, { getState }) => {
    const {
      session: { key: sessionKey },
    } = getState().auth;
    const user = await getUser(sessionKey || '');
    return user as User;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state: UserSliceState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state: UserSliceState, { payload: { name, realname, url, image } }) => {
        const largestImage = getLargestImage(image);
        return {
          ...state,
          name,
          realname,
          url,
          image: largestImage['#text'] || '',
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchUser.rejected,
      (state: UserSliceState) => initialState
    );
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
