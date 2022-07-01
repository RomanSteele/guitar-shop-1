import {GuitarCards} from '../types/guitar';

export const getMinimumPrice = (array: GuitarCards[]) => array.slice().sort((a, b) => a.price - b.price)[0].price;

export const getHighestPrice = (array: GuitarCards[])=> array.slice().sort((a, b) => b.price - a.price)[0].price;

export function filterNonNull(obj:object) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}

