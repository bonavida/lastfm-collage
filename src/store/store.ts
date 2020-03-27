import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// Wrap in Context
import auth from 'context/auth';
import user from 'context/user';
import albums from 'context/albums';

const rootReducer = combineReducers({
  auth,
  user,
  albums,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
