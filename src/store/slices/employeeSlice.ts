import { createSlice, nanoid } from '@reduxjs/toolkit';

import { getEmployees } from 'store/api/employee.api';
import { InitialStateEmployee } from 'store/types';

const initialState: InitialStateEmployee = {
  employees: [],
  selectedEmployees: [],
  loading: 'idle',
  error: '',
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    chooseEmployees: (state, action) => {
      if (action.payload.isChecked) {
        const newSelectedEmployees = [...state.selectedEmployees, action.payload.id];
        state.selectedEmployees = newSelectedEmployees;
      } else {
        state.selectedEmployees = state.selectedEmployees.filter((id) => id !== action.payload.id);
      }
    },

    deleteEmployees: (state) => {
      state.employees = state.employees.filter((employee) => !state.selectedEmployees.includes(employee.id));
    },

    deleteEmployeesWhenDeletingCompany: (state, action) => {
      state.employees = action.payload;
    },

    addEmployee: (state, action) => {
      const newEmployee = {
        id: nanoid(),
        idCompany: action.payload.idCompany,
        surname: action.payload.surname,
        name: action.payload.name,
        job: action.payload.job,
      };
      state.employees = [newEmployee, ...state.employees];
    },

    updateEmployeeInfo: (state, action) => {
      const newEmployee = state.employees.map((employee) => {
        if (employee.id === action.payload.id) {
          return {
            ...employee,
            surname: action.payload.surname || employee.surname,
            name: action.payload.name || employee.name,
            job: action.payload.job || employee.job,
          };
        }
        return employee;
      });
      state.employees = newEmployee;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      state.loading = 'succeeded';
    });

    builder.addCase(getEmployees.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { chooseEmployees, deleteEmployees, addEmployee, updateEmployeeInfo, deleteEmployeesWhenDeletingCompany } =
  employeeSlice.actions;
export default employeeSlice.reducer;
