import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useSelector as _useSelector } from "react-redux";

import {reducer as yearPicker} from './yearPicker/slice';
import {reducer as calcPicker} from './calcPicker/slice';
import {reducer as calcPickerUsage} from './calcPickerUsage/slice';

export const store = configureStore({
  reducer: {
    yearPicker,
    calcPicker,
    calcPickerUsage,
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