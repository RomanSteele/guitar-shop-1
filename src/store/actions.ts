import { createAction } from '@reduxjs/toolkit';
import { GuitarCard } from '../types/guitar';
import { Review, ReviewPost } from '../types/review';
import { ApiType } from '../const';

export const loadGuitars = createAction(
  ApiType.FetchGuitars,
  (guitars: GuitarCard[]) => ({
    payload: {
      guitars,
    },
  }),
);

export const loadReviews = createAction(
  ApiType.FetchGuitarReviews,
  (reviews: Review[]) => ({
    payload: {
      reviews,
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
  (status: boolean) => ({
    payload: {
      status,
    },
  }),
);

export const loadCurrentGuitars = createAction<GuitarCard[]>(ApiType.FetchCurrentGuitars);

export const loadGuitar = createAction<GuitarCard>(ApiType.FetchCurrentGuitar);
