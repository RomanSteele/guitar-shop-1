import { GuitarCard, GuitarCards } from './guitar';
import { store } from '../store/index';

export type State = {
    guitars: GuitarCards[],
    loadingStatus: boolean,
    guitarsOnPage: GuitarCard[],
    activeGuitar: GuitarCards,
  };

export type AppDispatch = typeof store.dispatch;
