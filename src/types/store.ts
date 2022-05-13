import { GuitarCard } from './guitar';
import { store } from '../store/index';

export type State = {
    guitars: GuitarCard[],
  };

export type AppDispatch = typeof store.dispatch;
