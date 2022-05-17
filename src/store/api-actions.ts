import { GuitarCard } from '../types/guitar';
import { Review } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/store';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars, loadReviews } from './actions';


export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchGuitars,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCard[]>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number | null, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchGuitarReviews,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}/comments`);
      dispatch(loadReviews(data));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert (error);
    }
  },
);
