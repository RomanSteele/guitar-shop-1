import { createAction } from '@reduxjs/toolkit';
import { GuitarCards } from '../types/guitar';
import { NewReviewPost } from '../types/review';
import { ApiType } from '../const';

export const loadGuitars = createAction(
  ApiType.FetchGuitars,
  (guitars: GuitarCards[]) => ({
    payload: {
      guitars,
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

export const addComment = createAction(
  ApiType.PostReview,
  (review: NewReviewPost) => ({
    payload: {
      review,
    },
  }),
);

export const loadGuitar = createAction<GuitarCards>(ApiType.FetchCurrentGuitar);

export const loadSearchGuitars = createAction(
  ApiType.FetchSearchGuitars,
  (guitarsOfSearch: GuitarCards[]) => ({
    payload: {
      guitarsOfSearch,
    },
  }),
);
