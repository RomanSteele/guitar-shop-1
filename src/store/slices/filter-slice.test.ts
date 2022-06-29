import {  fakeSortString, fakeStringCount } from '../../utils/mocks/mocks';
import {setGuitarsType,
  setGuitarsOrder,
  setAcousticFilterType,
  setElectricFilterType,
  setUkuleleFilterType,
  setFilterFourString,
  setFilterSixString,
  setFilterSevenString,
  setFilterTwelveString,
  setTotalMinPrice,
  setTotalMaxPrice} from './filter-slice';
import { filterSlice } from './filter-slice';


describe('Reducer', () => {
  const state = {
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
    filterTwelveString:'' };

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

  describe('Function: setAcousticFilterType', () => {
    it('should update filter type by setAcousticFilterType', () => {
      expect(filterSlice.reducer(state, setAcousticFilterType(fakeSortString)))
        .toEqual({ ...state, filterAcousticType: fakeSortString });
    });
  });

  describe('Function: setElectricFilterType', () => {
    it('should update filter type by setElectricFilterType', () => {
      expect(filterSlice.reducer(state, setElectricFilterType(fakeSortString)))
        .toEqual({ ...state, filterElectricType: fakeSortString });
    });
  });

  describe('Function: setUkuleleFilterType', () => {
    it('should update filter type by setUkuleleFilterType', () => {
      expect(filterSlice.reducer(state, setUkuleleFilterType(fakeSortString)))
        .toEqual({ ...state, filterUkuleleType: fakeSortString });
    });
  });

  describe('Function: setFilterFourString', () => {
    it('should update filter string by setFilterFourString', () => {
      expect(filterSlice.reducer(state, setFilterFourString(fakeSortString)))
        .toEqual({ ...state, filterFourString: fakeSortString });
    });
  });

  describe('Function: setFilterSixString', () => {
    it('should update filter string by setFilterSixString', () => {
      expect(filterSlice.reducer(state, setFilterSixString(fakeSortString)))
        .toEqual({ ...state, filterSixString: fakeSortString });
    });
  });

  describe('Function: setFilterSevenString', () => {
    it('should update filter string by setFilterSevenString', () => {
      expect(filterSlice.reducer(state, setFilterSevenString(fakeSortString)))
        .toEqual({ ...state, filterSevenString: fakeSortString });
    });
  });

  describe('Function: setFilterTwelveString', () => {
    it('should update filter string by setFilterTwelveString', () => {
      expect(filterSlice.reducer(state, setFilterTwelveString(fakeSortString)))
        .toEqual({ ...state, filterTwelveString: fakeSortString });
    });
  });

  describe('Function: setTotalMinPrice', () => {
    it('should update price string by setTotalMinPrice', () => {
      expect(filterSlice.reducer(state, setTotalMinPrice(fakeStringCount)))
        .toEqual({ ...state, minPrice: fakeStringCount });
    });
  });

  describe('Function: setTotalMaxPrice', () => {
    it('should update filter string by setTotalMaxPrice', () => {
      expect(filterSlice.reducer(state, setTotalMaxPrice(fakeStringCount)))
        .toEqual({ ...state, maxPrice: fakeStringCount });
    });
  });


});
