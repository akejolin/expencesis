import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useSelector as _useSelector } from "react-redux";

import {reducer as example} from './example/reducer';
import {reducer as yearPicker} from './yearPicker/slice';

export const store = configureStore({
  reducer: {
    example,
    yearPicker,
// This is where we add reducers.
// Since we don't have any yet, leave this empty
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

 export const useSelector = (pick) => useSelector((state:RootState) => state[pick]); 