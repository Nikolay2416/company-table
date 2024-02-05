import { Button, Pagination, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

import { CompanyModal } from './CompanyModal';
import { CompanyTableItem } from './CompanyTableItem';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getCompanies } from 'store/api/company.api';
import { deleteCompanies } from 'store/slices/companySlice';
import { deleteEmployeesWhenDeletingCompany } from 'store/slices/employeeSlice';

import cls from '../styles/companyTable.module.css';

export const CompanyTable: FC = () => {
  const { companies, selectedCompanies, loading } = useAppSelector((state) => state.companies);
  const { employees } = useAppSelector((state) => state.employees);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const pageSize = 20;
  const currentCompanies = companies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleDeleteCompanies = () => {
    const newEmployees = employees.filter((employee) => !selectedCompanies.includes(employee.idCompany));
    dispatch(deleteEmployeesWhenDeletingCompany(newEmployees));
    dispatch(deleteCompanies());
  };

  const companiesRender = currentCompanies.map(({ id, name, address }) => {
    const employeeCompanies = employees.filter((employee) => employee.idCompany === id);
    return (
      <CompanyTableItem key={id} id={id} name={name} address={address} employeeCompanies={employeeCompanies.length} />
    );
  });

  return (
    <div>
      <div className={cls.heading}>
        <h3>Компания</h3>
      </div>
      <div className={cls.buttons}>
        <Button onClick={() => setIsModalOpen(true)} className={cls.button}>
          Добавить компанию
        </Button>
        <CompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button onClick={handleDeleteCompanies} className={cls.button}>
          Удалить компанию
        </Button>
      </div>
      <div>
        <div className={cls.columns}>
          <p> </p>
          <p>Название компании</p>
          <p>Кол-во сотрудников</p>
          <p>Адрес</p>
        </div>
        <Spin spinning={loading === 'pending'}>
          {companiesRender}
          <Pagination
            defaultCurrent={1}
            total={companies.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            className={cls.pagination}
          />
        </Spin>
      </div>
    </div>
  );
};
