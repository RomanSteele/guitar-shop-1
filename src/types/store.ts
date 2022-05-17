import { GuitarCard } from './guitar';
import { Review } from './review';
import { store } from '../store/index';

export type State = {
    guitars: GuitarCard[],
    reviews: Review[],
  };

export type AppDispatch = typeof store.dispatch;
