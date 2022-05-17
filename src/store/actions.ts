import { createAction } from '@reduxjs/toolkit';
import { GuitarCard } from '../types/guitar';
import { Review } from '../types/review';
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
