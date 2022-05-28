import { makeFakeReviews, makeFakeGuitar, fakeEmptyGuitar  } from '../utils/mocks/mocks';
import { loadGuitars, loadReviews, loadCurrentGuitars, loadGuitar } from './actions';
import { rootReducer } from './root-reducer';
import { InitialGuitar } from '../const';
import {makeFakeGuitars } from '../utils/mocks/mocks';

const guitars = makeFakeGuitars(27);
const fewGuitars = makeFakeGuitars(9);
const reviews = makeFakeReviews(1);
const guitar = makeFakeGuitar();
const emptyGuitar = fakeEmptyGuitar;


describe('Reducer', () => {
  const state = { guitars: [], reviews: [], loadingStatus: false, guitarsOnPage: [], activeGuitar: InitialGuitar };

  describe('Function: loadGuitars', () => {
    it('without additional parameters should return initial state', () => {
      expect(rootReducer(void 0, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state });
    });

    it('should update guitars by load guitars', () => {
      expect(rootReducer(state, loadGuitars(guitars)))
        .toEqual( { ...state, guitars});
    });
  });

  describe('Function: loadReviews', () => {
    it('without additional parameters should return initial state', () => {
      expect(rootReducer(void 0, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state, reviews: []});
    });

    it('should update reviews by load reviews', () => {
      expect(rootReducer(state, loadReviews(reviews)))
        .toEqual( { ...state, reviews});
    });
  });

  describe('Function: loadCurrentGuitars', () => {
    it('without additional parameters should return initial state', () => {
      expect(rootReducer(void 0, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state, guitars: []});
    });

    it('should update active guitars by load active guitars', () => {
      expect(rootReducer(state, loadCurrentGuitars(fewGuitars)))
        .toEqual( { ...state, guitarsOnPage: fewGuitars});
    });
  });

  describe('Function: loadGuitar', () => {
    it('without additional parameters should return initial state', () => {
      expect(rootReducer(state, { type: 'UNKNOWN_ACTION' }))
        .toEqual({ ...state, activeGuitar: emptyGuitar });
    });

    it('should update films by load films', () => {
      expect(rootReducer(state, loadGuitar(guitar)))
        .toEqual({ ...state, activeGuitar: guitar });
    });
  });

});
