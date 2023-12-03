import { configureStore } from '@reduxjs/toolkit';

import countries from './countries.json';
import { formsReducer } from './forms.slice';

export const store = configureStore({
  reducer: {
    countries: () => countries,
    forms: formsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];
