import { GuitarCard, GuitarCards } from './guitar';
import { store } from '../store/index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataSliceTypes = {
    guitars: GuitarCards[],
    loadingStatus: boolean,
    guitarsOnPage: GuitarCard[],
    activeGuitar: GuitarCards,
    guitarsOfSearch:GuitarCards[],
    isLoading:boolean
  };

export type FilterSliceTypes = {
        sortType: string,
        sortOrder: string,
        filterType: string,
        filterPriceLow: string,
        filterPriceTop: string,
        filterString: string
  };
