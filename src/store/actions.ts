import { createAction } from '@reduxjs/toolkit';
import { GuitarCards } from '../types/guitar';
import { ReviewPost } from '../types/review';
import { ApiType } from '../const';

export const loadGuitars = createAction(
  ApiType.FetchGuitars,
  (guitars: GuitarCards[]) => ({
    payload: {
      guitars,
    },
  }),
);

export const addReview = createAction(
  ApiType.PostReview,
  (review: ReviewPost) => ({
    payload: {
      review,
    },
  }),
);

export const changeLoadingStatus = createAction(
  ApiType.ChangeLoadingStatus,
  (loadingStatus: boolean) => ({
    payload: {
      loadingStatus,
    },
  }),
);


export const loadGuitar = createAction<GuitarCards>(ApiType.FetchCurrentGuitar);
