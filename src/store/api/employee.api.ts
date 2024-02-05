import { createAsyncThunk } from '@reduxjs/toolkit';

import { employees } from 'data/employees';
import { Employee } from 'store/types';

export const getEmployees = createAsyncThunk('companies/employees', async () => {
  try {
    return new Promise<Employee[]>((resolve) => {
      setTimeout(() => {
        resolve(employees);
      }, 1500);
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
});
