import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import puzzleReducer from '../state/puzzleSlice';

export const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
