import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { loadGuitars, loadGuitar, loadReviews, changeLoadingStatus, loadCurrentGuitars } from './actions';
import { InitialGuitar } from '../const';

const initialState: State = {
  guitars:[],
  reviews:[],
  status: false,
  guitarsOnPage: [],
  activeGuitar: InitialGuitar,
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
    })
    .addCase(loadCurrentGuitars, (state, action) => {
      state.guitarsOnPage = action.payload;
    })
    .addCase(loadGuitar, (state, action) => {
      state.activeGuitar = action.payload;
    });
});
