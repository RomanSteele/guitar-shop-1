import { GuitarCard } from '../types/guitar';
import { Review, ReviewPost } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/store';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars, loadReviews, addReview, changeLoadingStatus } from './actions';


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
      //dispatch(redirectToRoute(`/guitars/${guitarId}`));
      console.log(changeLoadingStatus);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert (error);
      //handleHttpError (error);
      dispatch(changeLoadingStatus(true));
    }
  },
);
