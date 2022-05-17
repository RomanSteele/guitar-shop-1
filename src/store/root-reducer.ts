import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { loadGuitars, loadReviews } from './actions';

const initialState: State = {
  guitars:[],
  reviews:[],
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action)=>{
      const { guitars } = action.payload;
      state.guitars = guitars;
    })
    .addCase(loadReviews, (state, action)=>{
      const { reviews } = action.payload;
      state.reviews = reviews;
    });
});
