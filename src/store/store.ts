import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
// Wrap in Context
import auth, { AuthSliceState } from 'context/auth';

export type RootState = {
  auth: AuthSliceState;
};

const rootReducer: Reducer<RootState> = combineReducers({
  auth,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
