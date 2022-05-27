import { GuitarCard } from '../types/guitar';
import { Review, ReviewPost } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/store';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars, loadGuitar, loadReviews, addReview, changeLoadingStatus, loadCurrentGuitars } from './actions';
import { handleHttpError } from '../services/handle-http-error';


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
      console.log(data);
    } catch (error) {
      handleHttpError (error);
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
      const { data } = await api.get<Review[]>(`${APIRoute.Guitars}/${id}/comments`);
      dispatch(loadReviews(data));
      console.log(id);
    } catch (error) {
      handleHttpError (error);
    }
  },
);

export const postReview = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.PostReview,
  async ({ guitarId, userName, advantage, disadvantage, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(changeLoadingStatus(false));
      await api.post<ReviewPost>(`${APIRoute.Reviews}`, { guitarId, userName, advantage, disadvantage, comment, rating });
      dispatch(changeLoadingStatus(true));
      dispatch(addReview({ guitarId, userName, advantage, disadvantage, comment, rating }));
    } catch (error) {
      handleHttpError (error);
      dispatch(changeLoadingStatus(true));
    }
  },
);

export const fetchCurrentGuitarsAction = createAsyncThunk<void, Array<number>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async ([firstGuitarIndex, lastGuitarIndex], { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<GuitarCard[]>(`${APIRoute.Guitars}?_start=${firstGuitarIndex}&_end=${lastGuitarIndex}`);
      dispatch(loadCurrentGuitars(data));
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
      console.log(id);
      const {data} = await api.get<GuitarCard>(`${APIRoute.Guitars}/${id}`);
      console.log(data);
      dispatch(loadGuitar(data));
    }
    catch (error) {
      handleHttpError (error);
    }
  },
);

