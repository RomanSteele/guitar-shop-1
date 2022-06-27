import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataSlice } from './slices/data-slice';
import { filterSlice } from './slices/filter-slice';


export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.Filter]: filterSlice.reducer,
});
