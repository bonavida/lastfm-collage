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

export type Session = {
  subscriber?: number;
  name?: string;
  key?: string;
};

export type AuthSliceState = {
  token: string;
  session: Session;
  authPending: boolean;
};

const initialState: AuthSliceState = {
  token: localStorage.getItem('token') || '',
  session: JSON.parse(localStorage.getItem('session') || '{}'),
  authPending: false,
};

export const fetchSession = createAsyncThunk<
  Session,
  string,
  { state: RootState }
>('auth/fetchSession', async (apiSig, { getState }) => {
  const { token } = getState().auth;
  const session = await getSession(token, apiSig);
  return session as Session;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthSliceState, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.authPending = true;
    },
    clearAuth: (state: AuthSliceState) => {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
      state.token = '';
      state.session = {};
      state.authPending = false;
    },
    logout: (state: AuthSliceState) => {
      state.token = '';
      state.session = {};
      state.authPending = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSession.pending, (state: AuthSliceState) => {
      state.authPending = true;
    });
    builder.addCase(
      fetchSession.fulfilled,
      (state: AuthSliceState, action: PayloadAction<Session>) => {
        localStorage.setItem('session', JSON.stringify(action.payload));
        state.session = action.payload;
        state.authPending = false;
      }
    );
    builder.addCase(fetchSession.rejected, (state: AuthSliceState) => {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
      state.token = '';
      state.session = {};
      state.authPending = false;
    });
  },
});

export const { setToken, clearAuth, logout } = authSlice.actions;

export default authSlice.reducer;

export const setTokenAction = (token: string) => async (dispatch: Dispatch) => {
  dispatch(setToken(token));
};

/**

export const logoutAction = () => async dispatch => {
  dispatch(clearToken());
  dispatch(clearMe());
  dispatch(resetDevices());
};

export const clearTokenAction = () => async dispatch => {
  dispatch(clearToken());
};
*/
