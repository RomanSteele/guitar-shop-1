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
    isLoading:boolean,
    cartGuitars:GuitarCards[],
    coupon: string,
    language: string,
  };

export type FilterSliceTypes = {
        minPrice: number,
        maxPrice: number,
        sortType: string,
        sortOrder: string,
        filterAcousticType: string,
        filterElectricType:string,
        filterUkuleleType:string,
        filterPriceLow: string,
        filterPriceTop: string,
        filterFourString: string,
        filterSixString:string,
        filterSevenString:string,
        filterTwelveString:string,
  };
