import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISearchParams } from '../models/params.interface';

const localKey = 'pokemon-searchTerm';

const initialState: ISearchParams = {
  searchTerm: '',
  page: 1,
  limit: 20,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<Partial<ISearchParams>>) => {
      const { searchTerm } = action.payload;
      if (searchTerm) {
        localStorage.setItem(localKey, searchTerm);
      }
      return { ...state, ...action.payload };
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
