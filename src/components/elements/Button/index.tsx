import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  classname?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, classname = '', type = 'button', disabled=false }) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${classname} h-10 px-6 text-white font-semibold rounded-md`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
