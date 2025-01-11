import React from 'react';

interface LabelProps {
  htmlFor: string;
  label: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, label }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className="block text-slate-700 text-sm font-bold mb-2"
    >
      {label}
    </label>
  );
};

export default Label;
