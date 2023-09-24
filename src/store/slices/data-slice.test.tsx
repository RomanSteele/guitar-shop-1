import {  makeFakeGuitar  } from '../../utils/mocks/mocks';
import { loadGuitars, loadGuitar, dataSlice, setIsLoading, loadSearchGuitars } from './data-slice';
import { currentLanguage, InitialGuitar } from '../../const';
import {makeFakeGuitars } from '../../utils/mocks/mocks';

const guitars = makeFakeGuitars(27);
const guitar = makeFakeGuitar();


describe('Reducer', () => {
  const state = { guitars: [], loadingStatus: false, guitarsOnPage: [], activeGuitar: InitialGuitar, guitarsOfSearch:[], isLoading:true, cartGuitars:[], coupon:'', language: currentLanguage[1] };

  describe('Function: loadGuitars', () => {
    it('without additional parameters should return initial state', () => {
      expect(dataSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state });
    });

    it('should update guitars by load guitars', () => {
      expect(dataSlice.reducer(state, loadGuitars(guitars)))
        .toEqual( { ...state, guitars});
    });
  });

  describe('Function: loadGuitar', () => {
    it('should update films by load guitar', () => {
      expect(dataSlice.reducer(state, loadGuitar(guitar)))
        .toEqual({ ...state, activeGuitar: guitar });
    });
  });

  describe('Function: changeLoadingStatus', () => {
    it('should update Loading status by change loading status', () => {
      expect(dataSlice.reducer(state, setIsLoading(false)))
        .toEqual({ ...state, isLoading: false });
    });
  });

  describe('Function: loadSearchGuitars', () => {
    it('should update guitarsOfSearch by loadSearchGuitars', () => {
      expect(dataSlice.reducer(state, loadSearchGuitars('')))
        .toEqual({ ...state, guitarsOfSearch: '' });
    });
  });

});
