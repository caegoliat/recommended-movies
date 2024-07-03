// store/slices/movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  currentMovie: any | null;
  searchResults: any[];
}

const initialState: MovieState = {
  currentMovie: null,
  searchResults: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setCurrentMovie(state, action: PayloadAction<any>) {
      state.currentMovie = action.payload;
    },
    setSearchResults(state, action: PayloadAction<any[]>) {
      state.searchResults = action.payload;
    },
  },
});

export const { setCurrentMovie, setSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
