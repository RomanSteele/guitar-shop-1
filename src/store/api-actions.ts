import { GuitarCards } from '../types/guitar';
import { NewReviewPost, ReviewPost } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { changeLoadingStatus,setIsLoading, setCoupon, loadGuitars, loadGuitar, addComment, loadSearchGuitars } from './slices/data-slice';
import { handleHttpError } from '../services/handle-http-error';
import { setTotalMaxPrice, setTotalMinPrice } from './slices/filter-slice';
import { CouponPost } from '../types/coupon';
import { currentGuitarAdapterAndDispatch } from '../adapters/current-guitar-adapter';
import { guitarsAdapterAndDispatch } from '../adapters/guitars-adapter';
import { postReviewAdapterAndDispatch } from '../adapters/comment-adapter';
import { searchGuitarsAdapterAndDispatch } from '../adapters/search-adapter';
import { currencyChange } from '../utils/utils';


export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchGuitars,
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await api.get<GuitarCards[]>(APIRoute.GuitarsAndComments);
      const sortedGuitarsArray = data.slice().sort((a, b) => a.price - b.price);
      dispatch(setTotalMinPrice(sortedGuitarsArray[0].price));
      dispatch(setTotalMaxPrice(sortedGuitarsArray[sortedGuitarsArray.length - 1].price));
      dispatch(loadGuitars(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const fetchEnglishGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchGuitars,
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await api.get<GuitarCards[]>(APIRoute.GuitarsAndComments);
      const sortedGuitarsArray = data.slice().sort((a, b) => a.price - b.price);
      dispatch(setTotalMinPrice(currencyChange(sortedGuitarsArray[0].price)));
      dispatch(setTotalMaxPrice(currencyChange(sortedGuitarsArray[sortedGuitarsArray.length - 1].price)));
      guitarsAdapterAndDispatch(dispatch, data);
      dispatch(changeLoadingStatus(false));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(false));
    }
  },
);


export const fetchCurrentGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCards>(`${APIRoute.GuitarAndComments.replace(':id', id)}`);
      dispatch(loadGuitar(data));
    } catch (error) {
      handleHttpError(error);
    }
  },
);

export const fetchCurrentEnglishGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCards>(`${APIRoute.GuitarAndComments.replace(':id', id)}`);
      currentGuitarAdapterAndDispatch(dispatch, data);
    } catch (error) {
      handleHttpError(error);
    }
  },
);


export const postReview = createAsyncThunk<void, NewReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.PostReview,
  async ({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }, { dispatch, extra: api }) => {
    try {
      dispatch(changeLoadingStatus(true));
      await api.post<ReviewPost>(`${APIRoute.Reviews}`, { guitarId, userName, advantage, disadvantage, comment, rating });
      dispatch(addComment({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }));
      dispatch(changeLoadingStatus(false));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const postEnglishReview = createAsyncThunk<void, NewReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.PostReview,
  async ({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }, { dispatch, extra: api }) => {
    try {
      dispatch(changeLoadingStatus(true));
      await api.post<ReviewPost>(`${APIRoute.Reviews}`, { guitarId, userName, advantage, disadvantage, comment, rating });
      postReviewAdapterAndDispatch(dispatch,{guitarId, userName, advantage, disadvantage, comment, rating, createAt, id });
      dispatch(changeLoadingStatus(true));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(false));
    }
  },
);


export const fetchSortedGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchSortedGuitars,
  async (search, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoading(true));
      const {data} = await api.get<GuitarCards[]>(`${APIRoute.Guitars}${search}&_embed=comments`);
      dispatch(loadGuitars(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      handleHttpError (error);
      dispatch(setIsLoading(false));
    }
  },
);

export const fetchSortedEnglishGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchSortedGuitars,
  async (search, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoading(true));
      const {data} = await api.get<GuitarCards[]>(`${APIRoute.Guitars}${search}&_embed=comments`);
      guitarsAdapterAndDispatch(dispatch, data);
    } catch (error) {
      handleHttpError (error);
    }
  },
);


export const fetchGuitarsSearchAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchSearchGuitars,
  async (item, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarCards[]>(`${APIRoute.Guitars}?name_like=${item}`);
      dispatch(loadSearchGuitars(data));
    } catch (error) {
      handleHttpError (error);
    }
  },
);

export const fetchEnglishGuitarsSearchAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchSearchGuitars,
  async (item, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarCards[]>(`${APIRoute.Guitars}?name_like=${item}`);
      searchGuitarsAdapterAndDispatch(dispatch, data);
    } catch (error) {
      handleHttpError (error);
    }
  },
);


export const postCoupon = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.PostCoupon,
  async ( coupon , { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<CouponPost>(APIRoute.Coupon, {coupon: coupon} );
      dispatch(setCoupon(data));
    } catch (error) {
      dispatch(setCoupon(''));
      handleHttpError (error);
    }
  },
);
