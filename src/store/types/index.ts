export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface InitialStateCompany {
  companies: Company[];
  selectedCompanies: string[];
  loading: Loading;
  error: string | undefined;
}

export interface InitialStateEmployee {
  employees: Employee[];
  selectedEmployees: string[];
  loading: Loading;
  error: string | undefined;
}

export interface Company {
  id: string;
  name: string;
  address: string;
}

export interface Employee {
  id: string;
  idCompany: string;
  surname: string;
  name: string;
  job: string;
}
