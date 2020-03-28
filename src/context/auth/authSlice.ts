import {
  createSlice,
  PayloadAction,
  Dispatch,
  createAsyncThunk,
} from '@reduxjs/toolkit';
/** Services */
import { getSession } from 'services/auth';
/** Types */
import { RootState } from 'store';
import { Session } from 'models/auth';

export type AuthSliceState = {
  token: string;
  sessionKey: string;
  loading: boolean;
};

const initialState: AuthSliceState = {
  token: localStorage.getItem('token') || '',
  sessionKey: localStorage.getItem('sessionKey') || '',
  loading: false,
};

export const fetchSession = createAsyncThunk<
  Session,
  void,
  { state: RootState }
>('auth/fetchSession', async (_, { getState }) => {
  const { token } = getState().auth;
  const session = await getSession(token);
  return session as Session;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthSliceState, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    clearAuth: (state: AuthSliceState) => {
      localStorage.removeItem('token');
      localStorage.removeItem('sessionKey');
      state.token = '';
      state.sessionKey = '';
      state.loading = false;
    },
    logout: (state: AuthSliceState) => {
      state.token = '';
      state.sessionKey = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSession.pending, (state: AuthSliceState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSession.fulfilled,
      (state: AuthSliceState, { payload: { key } }) => {
        localStorage.setItem('sessionKey', key);
        state.sessionKey = key;
        state.loading = false;
      }
    );
    builder.addCase(fetchSession.rejected, (state: AuthSliceState) => {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
      state.token = '';
      state.sessionKey = '';
      state.loading = false;
    });
  },
});

export const { setToken, clearAuth, logout } = authSlice.actions;

export default authSlice.reducer;

export const setTokenAction = (token: string) => async (dispatch: Dispatch) => {
  dispatch(setToken(token));
};

export const clearAuthAction = () => async (dispatch: Dispatch) => {
  dispatch(clearAuth());
};

/**

export const logoutAction = () => async dispatch => {
  dispatch(clearToken());
  dispatch(clearMe());
  dispatch(resetDevices());
};

*/
