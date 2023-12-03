import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFormStore } from '../models/form.interface';

const initialState: IFormStore[] = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<IFormStore>) => {
      state.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;
export const formsReducer = formsSlice.reducer;
