import { createSlice, nanoid } from '@reduxjs/toolkit';

import { getCompanies } from 'store/api/company.api';
import { InitialStateCompany } from 'store/types';

const initialState: InitialStateCompany = {
  companies: [],
  selectedCompanies: [],
  loading: 'idle',
  error: '',
};

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    chooseCompanies: (state, action) => {
      if (action.payload.isChecked) {
        const newSelectedCompanies = [...state.selectedCompanies, action.payload.id];
        state.selectedCompanies = newSelectedCompanies;
      } else {
        state.selectedCompanies = state.selectedCompanies.filter((id) => id !== action.payload.id);
      }
    },

    addCompany: (state, action) => {
      const newCompany = {
        id: nanoid(),
        name: action.payload.name,
        address: action.payload.address,
      };
      state.companies = [newCompany, ...state.companies];
    },

    deleteCompanies: (state) => {
      state.companies = state.companies.filter((company) => !state.selectedCompanies.includes(company.id));
    },

    updateCompanyInfo: (state, action) => {
      const newCompany = state.companies.map((company) => {
        if (company.id === action.payload.id) {
          return {
            ...company,
            name: action.payload.updatedName || company.name,
            address: action.payload.updatedAddress || company.address,
          };
        }
        return company;
      });
      state.companies = newCompany;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanies.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getCompanies.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { chooseCompanies, addCompany, deleteCompanies, updateCompanyInfo } = companySlice.actions;
export default companySlice.reducer;
