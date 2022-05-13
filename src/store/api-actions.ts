import { GuitarCard } from '../types/guitar';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  State, AppDispatch } from '../types/store';
import { AxiosInstance } from 'axios';
import { ApiType, APIRoute } from '../const';
import { loadGuitars } from './actions';


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
