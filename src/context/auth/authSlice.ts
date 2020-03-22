import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
// import http from 'services/core/http';

export type AuthSliceState = {
  token: string;
  sessionKey: string;
};

const initialState: AuthSliceState = {
  token: localStorage.getItem('token') || '',
  sessionKey: localStorage.getItem('sessionKey') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthSliceState, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    setSessionKey: (state: AuthSliceState, action: PayloadAction<string>) => {
      localStorage.setItem('sessionKey', action.payload);
      state.sessionKey = action.payload;
    },
    clearAuth: (state: AuthSliceState) => {
      localStorage.removeItem('token');
      localStorage.removeItem('sessionKey');
      state.token = '';
      state.sessionKey = '';
    },
    logout: (state: AuthSliceState) => {
      state.token = '';
      state.sessionKey = '';
    },
  },
});

export const { setToken, setSessionKey, clearAuth, logout } = authSlice.actions;

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
