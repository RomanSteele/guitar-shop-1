import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { loadGuitars, loadReviews, changeLoadingStatus } from './actions';

const initialState: State = {
  guitars:[],
  reviews:[],
  status: false,
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
    })
    .addCase(changeLoadingStatus, (state, action)=>{
      const { status } = action.payload;
      state.status = status;
    });
});
