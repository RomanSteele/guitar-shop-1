import { createSlice } from '@reduxjs/toolkit';
import { InitialGuitar, NameSpace } from '../../const';
import { DataSliceTypes } from '../../types/state';

const initialState: DataSliceTypes = {
  guitars:[],
  loadingStatus: false,
  guitarsOnPage: [],
  activeGuitar: InitialGuitar,
  guitarsOfSearch: [],
  isLoading: true,
};


export const dataSlice = createSlice ({
  name: NameSpace.Data,
  initialState,
  reducers:{
    loadGuitars(state, action){
      state.guitars = action.payload;
    },
    changeLoadingStatus(state, action){
      state.loadingStatus = action.payload;
    },
    loadGuitar(state, action){
      state.activeGuitar = action.payload;
    },
    addComment(state, action){
      state.activeGuitar.comments.push(action.payload);
    },
    loadSearchGuitars(state, action){
      state.guitarsOfSearch = action.payload;
    },
    setIsLoading(state, action){
      state.isLoading = action.payload;
    },
  },
});

export const { loadGuitars,changeLoadingStatus,loadGuitar,addComment,loadSearchGuitars, setIsLoading } = dataSlice.actions;

