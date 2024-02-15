import { createSlice } from '@reduxjs/toolkit';
import { currentLanguage, InitialGuitar, NameSpace } from '../../const';
import { DataSliceTypes } from '../../types/state';

const initialState: DataSliceTypes = {
  guitars:[],
  loadingStatus: false,
  guitarsOnPage: [],
  activeGuitar: InitialGuitar,
  guitarsOfSearch: [],
  isLoading: false,
  cartGuitars:[],
  coupon:'',
  language: currentLanguage[1],
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
    changeLanguage(state, action){
      state.language = action.payload;
    },
    addToCart(state, action){
      if (state.cartGuitars.find((item) => item.id === action.payload.id)) {
        const guitarIndex = state.cartGuitars.findIndex((item) => item.id === action.payload.id);
        state.cartGuitars = [...state.cartGuitars.slice(0, guitarIndex), action.payload, ...state.cartGuitars.slice(guitarIndex)];
      } else {
        state.cartGuitars = [action.payload, ...state.cartGuitars];
      }
    },
    deleteFromCart(state, action){
      const guitarIndex = state.cartGuitars.findIndex((item) => item.id === action.payload.id);
      state.cartGuitars = [...state.cartGuitars.slice(0, guitarIndex), ...state.cartGuitars.slice(guitarIndex + 1)];
    },
    eraseFromCart: (state, action) => {
      state.cartGuitars = state.cartGuitars.slice().filter((item) => item.vendorCode !== action.payload.vendorCode);
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});

export const { loadGuitars,changeLoadingStatus, changeLanguage, loadGuitar,addComment,loadSearchGuitars, setIsLoading,addToCart,deleteFromCart, eraseFromCart, setCoupon } = dataSlice.actions;

