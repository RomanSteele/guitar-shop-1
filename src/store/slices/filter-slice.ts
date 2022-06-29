import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilterSliceTypes } from '../../types/state';


const initialState: FilterSliceTypes = {
  sortType: '',
  sortOrder: '',
  filterAcousticType: '',
  filterElectricType:'',
  filterUkuleleType:'',
  filterPriceLow: '',
  filterPriceTop: '',
  filterFourString: '',
  filteSixString:'',
  filterSevenString:'',
  filterTwelveString:'',
};

export const filterSlice = createSlice ({
  name: NameSpace.Filter,
  initialState,
  reducers:{
    setGuitarsType(state, action) {
      state.sortType = action.payload;
    },
    setGuitarsOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setFilters(state,action){
      state.sortType = action.payload.currentSortType;
      state.sortOrder = action.payload.currentOrderType;
      state.filterAcousticType = action.payload.currentAcousticType;
      state.filterElectricType = action.payload.currentElectricType;
      state.filterUkuleleType = action.payload.currentUkuleleType;
      state.filterPriceLow = action.payload.currentFilterPriceLow;
      state.filterPriceTop = action.payload.currentFilterPriceTop;
      state.filterFourString = action.payload.currentFilterFourString;
      state.filteSixString = action.payload.currentFilterSixString;
      state.filterSevenString = action.payload.currentFilterSevenString;
      state.filterTwelveString = action.payload.currentFilterTwelveString;
    },
    setAcousticFilterType(state,action){
      state.filterAcousticType = action.payload;
    },
    setElectricFilterType(state,action){
      state.filterElectricType = action.payload;
    },
    setUkuleleFilterType(state,action){
      state.filterUkuleleType = action.payload;
    },
    setFilterPrice(state,action){
      state.filterPriceLow = action.payload.lowPrice;
      state.filterPriceTop = action.payload.highPrice;
    },
    setFilterFourString(state,action){
      state.filterFourString = action.payload;
    },
    setFilterSixString(state,action){
      state.filteSixString = action.payload;
    },
    setFilterSevenString(state,action){
      state.filterSevenString = action.payload;
    },
    setFilterTwelveString(state,action){
      state.filterTwelveString = action.payload;
    },
  },
});

export const {
  setGuitarsType,
  setGuitarsOrder,
  setFilters,
  setAcousticFilterType,
  setElectricFilterType,
  setUkuleleFilterType,
  setFilterPrice,
  setFilterFourString,
  setFilterSixString,
  setFilterSevenString,
  setFilterTwelveString,
} = filterSlice.actions;

