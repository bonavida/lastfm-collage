import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/** Services */
import { getUser } from 'services/lastfm';
/** Types */
import { User } from 'models/user';
/** Actions */
import { clearAuthAction } from 'context/auth';
import { RootState } from 'store';

export type UserSliceState = {
  user: User;
  loading: boolean;
};

const initialState: UserSliceState = {
  user: {},
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
      (state: UserSliceState, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchUser.rejected, (state: UserSliceState) => {
      state.user = {};
      state.loading = false;
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
