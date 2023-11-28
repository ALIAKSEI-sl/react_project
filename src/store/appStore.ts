import { createWrapper, MakeStore } from "next-redux-wrapper";

import { configureStore } from "@reduxjs/toolkit";

import { pokemonApi } from "./pokemon.api";
import { searchReducer } from "./search.slice";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];

const makeStore: MakeStore<AppStore> = () => store;
export const wrapper = createWrapper<AppStore>(makeStore);
