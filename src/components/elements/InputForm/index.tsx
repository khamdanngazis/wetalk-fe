import React from 'react';
import Label from './Label';
import Input from './Input';

interface InputFormProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ label, name, type, placeholder = '', value = '', onChange , required = true}) => {
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <Input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />
    </div>
  );
};

export default InputForm;
