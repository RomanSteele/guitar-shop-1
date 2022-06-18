import { GuitarCards } from '../types/guitar';
import { NewReviewPost, ReviewPost } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/store';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars, loadGuitar, changeLoadingStatus, addComment } from './actions';
import { handleHttpError } from '../services/handle-http-error';


export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiType.FetchGuitars,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<GuitarCards[]>(APIRoute.GuitarsAndComments);
      console.log(data);
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
    const {data} = await api.get<GuitarCards[]>(`${APIRoute.Guitars}/${search}&_embed=comments`);
    dispatch(loadGuitars(data));
  },
);
