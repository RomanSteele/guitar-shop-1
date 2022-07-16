import { GuitarCards } from '../types/guitar';
import { NewReviewPost, ReviewPost } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars, loadGuitar, changeLoadingStatus, addComment, loadSearchGuitars,setIsLoading, setCoupon } from './slices/data-slice';
import { handleHttpError } from '../services/handle-http-error';
import { setTotalMaxPrice, setTotalMinPrice } from './slices/filter-slice';
import { CouponPost } from '../types/coupon';


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
      dispatch(setIsLoading(false));
      dispatch(loadGuitars(data));
    } catch (error) {
      handleHttpError (error);
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
      const {data} = await api.get<GuitarCards>(`${APIRoute.GuitarAndComments.replace(':id',id)}`);
      dispatch(loadGuitar(data));
    }
    catch (error) {
      handleHttpError (error);
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
      dispatch(changeLoadingStatus(false));
      await api.post<ReviewPost>(`${APIRoute.Reviews}`, { guitarId, userName, advantage, disadvantage, comment, rating });
      dispatch(changeLoadingStatus(true));
      dispatch(addComment({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(true));
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
      dispatch(setIsLoading(false));
      dispatch(loadGuitars(data));
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


export const fetchTotalMinPrice = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchTotal,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCards[]>(`${APIRoute.Guitars}?_limit=1&_sort=price&_order=asc`);

      dispatch(setTotalMinPrice(data[0].price));
    } catch (error) {
      handleHttpError (error);
    }
  },
);


export const fetchTotalMaxPrice = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchTotal,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCards[]>(`${APIRoute.Guitars}?_limit=1&_sort=price&_order=desc`);

      dispatch(setTotalMaxPrice(data[0].price));
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
