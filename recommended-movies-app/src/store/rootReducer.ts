// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
