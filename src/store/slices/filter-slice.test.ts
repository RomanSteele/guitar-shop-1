import {  fakeSortString  } from '../../utils/mocks/mocks';
import { setGuitarsType, setGuitarsOrder, setFilterType, setFilterString } from './filter-slice';
import { filterSlice } from './filter-slice';


describe('Reducer', () => {
  const state = { sortType: '',
    sortOrder: '',
    filterType: '',
    filterPriceLow: '',
    filterPriceTop: '',
    filterString: '' };

  describe('Function: setFilters', () => {
    it('without additional parameters should return initial state', () => {
      expect(filterSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state });
    });
  });

  describe('Function: setGuitarsType', () => {
    it('should update type by setGuitarsType', () => {
      expect(filterSlice.reducer(state, setGuitarsType(fakeSortString)))
        .toEqual({ ...state, sortType: fakeSortString });
    });
  });

  describe('Function: setGuitarsOrder', () => {
    it('should update order by setGuitarsOrder', () => {
      expect(filterSlice.reducer(state, setGuitarsOrder(fakeSortString)))
        .toEqual({ ...state, sortOrder: fakeSortString });
    });
  });

  describe('Function: setFilterType', () => {
    it('should update filter type by setFilterType', () => {
      expect(filterSlice.reducer(state, setFilterType(fakeSortString)))
        .toEqual({ ...state, filterType: fakeSortString });
    });
  });

  describe('Function: setFilterString', () => {
    it('should update filter string by setFilterString', () => {
      expect(filterSlice.reducer(state, setFilterString(fakeSortString)))
        .toEqual({ ...state, filterString: fakeSortString });
    });
  });


});
