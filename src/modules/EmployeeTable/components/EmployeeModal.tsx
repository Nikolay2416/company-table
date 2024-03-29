import { Input, Modal, Select } from 'antd';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { addEmployee } from 'store/slices/employeeSlice';

import cls from '../styles/employeeModal.module.css';

interface EmployeeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EmployeeModal: FC<EmployeeModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { companies } = useAppSelector((state) => state.companies);
  const [surname, setSurname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [idCompany, setIdCompany] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(addEmployee({ surname, name, job, idCompany }));
    setSurname('');
    setName('');
    setJob('');
    setIdCompany('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const companiesForSelect = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  return (
    <Modal title="Добавить сотрудника" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Select
        placeholder="Компания"
        className={`${cls.select} ${cls.modalItem}`}
        value={idCompany ? idCompany : null}
        onChange={(e) => setIdCompany(e)}
        options={companiesForSelect}
      />
      <Input
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Фамилия"
        className={cls.modalItem}
      />
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className={cls.modalItem} />
      <Input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Должность" />
    </Modal>
  );
};
