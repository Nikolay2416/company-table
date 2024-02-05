import { createAsyncThunk } from '@reduxjs/toolkit';

import { companies } from 'data/companies';
import { Company } from 'store/types';

export const getCompanies = createAsyncThunk('companies/companies', async () => {
  try {
    return new Promise<Company[]>((resolve) => {
      setTimeout(() => {
        resolve(companies);
      }, 1500);
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
});
