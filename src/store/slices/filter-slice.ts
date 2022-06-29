import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilterSliceTypes } from '../../types/state';


const initialState: FilterSliceTypes = {
  minPrice: 0,
  maxPrice: 0,
  sortType: '',
  sortOrder: '',
  filterPriceLow: '',
  filterPriceTop: '',
  filterAcousticType: '',
  filterElectricType:'',
  filterUkuleleType:'',
  filterFourString: '',
  filterSixString:'',
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
      state.filterAcousticType = action.payload.currentAcousticFilterType;
      state.filterElectricType = action.payload.currentElectricFilterType;
      state.filterUkuleleType = action.payload.currentUkuleleFilterType;
      state.filterPriceLow = action.payload.currentFilterPriceLow;
      state.filterPriceTop = action.payload.currentFilterPriceTop;
      state.filterFourString = action.payload.currentFilterFourString;
      state.filterSixString = action.payload.currentFilterSixString;
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
      state.filterSixString = action.payload;
    },
    setFilterSevenString(state,action){
      state.filterSevenString = action.payload;
    },
    setFilterTwelveString(state,action){
      state.filterTwelveString = action.payload;
    },
    setTotalMinPrice(state,action){
      state.minPrice = action.payload;
    },
    setTotalMaxPrice(state,action){
      state.maxPrice = action.payload;
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
  setTotalMinPrice,
  setTotalMaxPrice,
} = filterSlice.actions;

