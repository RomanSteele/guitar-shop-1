import { makeFakeGuitar  } from '../utils/mocks/mocks';
import { loadGuitars, loadGuitar } from './actions';
import { rootReducer } from './root-reducer';
import { InitialGuitar } from '../const';
import {makeFakeGuitars } from '../utils/mocks/mocks';

const guitars = makeFakeGuitars(27);
const guitar = makeFakeGuitar();


describe('Reducer', () => {
  const state = { guitars: [], loadingStatus: false, guitarsOnPage: [], activeGuitar: InitialGuitar, guitarsOfSearch:[] };

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

  describe('Function: loadGuitar', () => {
    it('should update films by load films', () => {
      expect(rootReducer(state, loadGuitar(guitar)))
        .toEqual({ ...state, activeGuitar: guitar });
    });
  });

});
