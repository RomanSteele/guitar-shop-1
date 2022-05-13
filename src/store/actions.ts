import { createAction } from '@reduxjs/toolkit';
import { GuitarCard } from '../types/guitar';
import { ApiType } from '../const';

export const loadGuitars = createAction(
  ApiType.FetchGuitars,
  (guitars: GuitarCard[]) => ({
    payload: {
      guitars,
    },
  }),
);
