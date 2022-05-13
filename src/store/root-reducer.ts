import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { loadGuitars } from './actions';

const initialState: State = {
  guitars:[],
  comments:[],
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action)=>{
      const { guitars } = action.payload;
      state.guitars = guitars;
    });
});
