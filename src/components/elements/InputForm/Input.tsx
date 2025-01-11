import React from 'react';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
}

const Input: React.FC<InputProps> = ({ name, type, placeholder = '', value = '', onChange, required = true, classname= "" }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`mb-4 ${classname} focus:outline-none focus:border-teal-500 text-sm border rounded w-full py-2 px-3 text-slate-600 placeholder:opacity-50`}
      placeholder={placeholder}
    />
  );
};

export default Input;
