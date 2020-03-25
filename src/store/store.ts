import {
  configureStore,
  combineReducers,
  Action,
  Reducer,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// Wrap in Context
import auth from 'context/auth';

const rootReducer = combineReducers({
  auth,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
