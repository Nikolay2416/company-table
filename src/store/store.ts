import { configureStore } from '@reduxjs/toolkit';

import companySlice from 'store/slices/companySlice';
import employeeSlice from 'store/slices/employeeSlice';

export const store = configureStore({
  reducer: {
    companies: companySlice,
    employees: employeeSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
