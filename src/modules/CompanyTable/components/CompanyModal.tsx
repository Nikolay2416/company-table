import { Input, Modal } from 'antd';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { useAppDispatch } from 'hooks/store';
import { addCompany } from 'store/slices/companySlice';

import cls from '../styles/companyModal.module.css';

interface CompanyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CompanyModal: FC<CompanyModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(addCompany({ name, address }));
    setName('');
    setAddress('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="Добавить компанию" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название компании"
        className={cls.inputName}
      />
      <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес компании" />
    </Modal>
  );
};
