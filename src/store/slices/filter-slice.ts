import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilterSliceTypes } from '../../types/state';


const initialState: FilterSliceTypes = {
  sortType: '',
  sortOrder: '',
  filterType: '',
  filterPriceLow: '',
  filterPriceTop: '',
  filterString: '',
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
      state.filterType = action.payload.currentFilterType;
      state.filterPriceLow = action.payload.currentFilterPriceLow;
      state.filterPriceTop = action.payload.currentFilterPriceTop;
      state.filterString = action.payload.currentFilterString;
    },
    setFilterType(state,action){
      state.filterType = action.payload;
    },
    setFilterPrice(state,action){
      state.filterPriceLow = action.payload.lowPrice;
      state.filterPriceTop = action.payload.highPrice;
    },
    setFilterString(state,action){
      state.filterString = action.payload;
    },
  },
});

export const { setGuitarsType,setGuitarsOrder,setFilters,setFilterType, setFilterPrice, setFilterString } = filterSlice.actions;

