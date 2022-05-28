import { GuitarCard } from './guitar';
import { Review } from './review';
import { store } from '../store/index';

export type State = {
    guitars: GuitarCard[],
    reviews: Review[],
    loadingStatus: boolean,
    guitarsOnPage: GuitarCard[],
    activeGuitar: GuitarCard,
  };

export type AppDispatch = typeof store.dispatch;
