import { configureStore } from '@reduxjs/toolkit';

import { pokemonApi } from './pokemon.api';
import { searchReducer } from './search.slice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;

export const searchParamsSelect = (state: RootState) => state.search;
