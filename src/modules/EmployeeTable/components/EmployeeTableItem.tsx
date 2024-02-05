import { Checkbox, Input } from 'antd';
import { ChangeEvent, FC, memo, useState } from 'react';

import { useAppDispatch } from 'hooks/store';
import { chooseEmployees, updateEmployeeInfo } from 'store/slices/employeeSlice';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import cls from '../styles/employeeTableItem.module.css';

interface EmployeeTableItemProps {
  id: string;
  idCompany: string;
  surname: string;
  name: string;
  job: string;
}

export const EmployeeTableItem: FC<EmployeeTableItemProps> = memo(({ id, idCompany, surname, name, job }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [editedSurname, setEditedSurname] = useState<string>('');
  const [editedName, setEditedName] = useState<string>('');
  const [editedJob, setEditedJb] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChangeCheckbox = (e: CheckboxChangeEvent, id: string) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    dispatch(chooseEmployees({ isChecked, id }));
  };

  const onChangeInfo = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const updatedValue = e.target.value;
    if (field === 'surname') {
      setEditedSurname(updatedValue);
    } else if (field === 'name') {
      setEditedName(updatedValue);
    } else if (field === 'job') {
      setEditedJb(updatedValue);
    }
    dispatch(updateEmployeeInfo({ id, idCompany, [field]: updatedValue }));
  };

  return (
    <div key={id} className={`${cls.line} ${checked ? cls.lineActive : ''}`}>
      <div>
        <Checkbox checked={checked} onChange={(e) => handleChangeCheckbox(e, id)}></Checkbox>
      </div>
      <Input value={editedSurname || surname} onChange={(e) => onChangeInfo(e, id, 'surname')} className={cls.input} />
      <Input value={editedName || name} onChange={(e) => onChangeInfo(e, id, 'name')} className={cls.input} />
      <Input value={editedJob || job} onChange={(e) => onChangeInfo(e, id, 'job')} className={cls.input} />
    </div>
  );
});
