import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { loadGuitars, loadGuitar, changeLoadingStatus } from './actions';
import { InitialGuitar } from '../const';

const initialState: State = {
  guitars:[],
  loadingStatus: false,
  guitarsOnPage: [],
  activeGuitar: InitialGuitar,
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action)=>{
      const { guitars } = action.payload;
      state.guitars = guitars;
    })
    .addCase(changeLoadingStatus, (state, action)=>{
      const { loadingStatus } = action.payload;
      state.loadingStatus = loadingStatus;
    })
    .addCase(loadGuitar, (state, action) => {
      state.activeGuitar = action.payload;
    });
});

