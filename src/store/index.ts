import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

type RootState = ReturnType<typeof store.getState>;

export const searchParamsSelect = (state: RootState) => state;
