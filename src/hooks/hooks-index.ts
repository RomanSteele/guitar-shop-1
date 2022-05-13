import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { State, AppDispatch } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
