import { Button } from 'antd';
import { FC, useEffect, useState } from 'react';

import { EmployeeModal } from './EmployeeModal';
import { EmployeeTableItem } from './EmployeeTableItem';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getEmployees } from 'store/api/employee.api';
import { deleteEmployees } from 'store/slices/employeeSlice';

import cls from '../styles/employeeTable.module.css';

export const EmployeeTable: FC = () => {
  const { selectedCompanies } = useAppSelector((state) => state.companies);
  const { employees } = useAppSelector((state) => state.employees);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const employeesRender = employees
    .filter((emp) => selectedCompanies.includes(emp.idCompany))
    .map(({ id, idCompany, surname, name, job }) => {
      return <EmployeeTableItem key={id} id={id} idCompany={idCompany} surname={surname} name={name} job={job} />;
    });

  return (
    <div>
      <div className={cls.heading}>
        <h3>Сотрудники</h3>
      </div>
      <div className={cls.buttons}>
        <Button onClick={() => setIsModalOpen(true)} className={cls.button}>
          Добавить сотрудника
        </Button>
        <EmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button onClick={() => dispatch(deleteEmployees())} className={cls.button}>
          Удалить сотрудника
        </Button>
      </div>
      <div>
        <div className={cls.columns}>
          <p> </p>
          <p>Фамилия</p>
          <p>Имя</p>
          <p>Должность</p>
        </div>
        {employeesRender}
      </div>
    </div>
  );
};
