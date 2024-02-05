import { Checkbox, Input } from 'antd';
import { ChangeEvent, FC, memo, useState } from 'react';

import { useAppDispatch } from 'hooks/store';
import { chooseCompanies, updateCompanyInfo } from 'store/slices/companySlice';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import cls from '../styles/сompanyTableItem.module.css';

interface CompanyTableItemProps {
  id: string;
  name: string;
  address: string;
  employeeCompanies: number;
}

export const CompanyTableItem: FC<CompanyTableItemProps> = memo(({ id, name, address, employeeCompanies }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>('');
  const [editedAddress, setEditedAddress] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChangeCheckbox = (e: CheckboxChangeEvent, id: string) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    dispatch(chooseCompanies({ isChecked, id }));
  };

  const onChangeInfo = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const updatedValue = e.target.value;
    if (field === 'name') {
      setEditedName(updatedValue);
    } else if (field === 'address') {
      setEditedAddress(updatedValue);
    }
    dispatch(updateCompanyInfo({ id, [field]: updatedValue }));
  };

  return (
    <div key={id} className={`${cls.line} ${checked ? cls.lineActive : ''}`}>
      <div>
        <Checkbox checked={checked} onChange={(e) => handleChangeCheckbox(e, id)}></Checkbox>
      </div>
      <Input value={editedName || name} onChange={(e) => onChangeInfo(e, id, 'name')} />
      <p>{employeeCompanies}</p>
      <Input
        value={editedAddress || address}
        onChange={(e) => onChangeInfo(e, id, 'address')}
        className={cls.inputAddress}
      />
    </div>
  );
});
