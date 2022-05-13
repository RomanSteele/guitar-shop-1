import { GuitarCard } from './guitar';
import { Comment } from './comment';
import { store } from '../store/index';

export type State = {
    guitars: GuitarCard[],
    comments: Comment[],
  };

export type AppDispatch = typeof store.dispatch;
