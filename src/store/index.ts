import { createWrapper } from "next-redux-wrapper";

import { configureStore } from "@reduxjs/toolkit";

import { pokemonApi } from "./pokemon.api";
import { searchReducer } from "./search.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

type AppStore = ReturnType<typeof makeStore>;

export const searchParamsSelect = (state: AppStore) => state.getState().search;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
