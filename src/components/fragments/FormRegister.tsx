import React from 'react';
import InputForm from '../elements/InputForm';
import Button from '../elements/Button';

interface RegisterProps {
    onSubmit: (e:React.FormEvent) => void;
    registerData: {
        name: string;
        email: string;
        password: string;
        confirm_password: string;
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
    error?: string;
    isErrorVisible?: boolean;
}

const FormRegister: React.FC<RegisterProps> = ({ onSubmit, registerData, onChange, isLoading = false, error="", isErrorVisible=false}) => {

  return (
    <form onSubmit={onSubmit}>
      {error && isErrorVisible && (
            <div className="text-rose-500 mb-4 transition-opacity opacity-100 animate-fade-out">
            {error}
            </div>
        )}
      <div className="mb-6">
        <InputForm 
            label="Full Name" 
            type="text" 
            name="name" 
            value={registerData.name} 
            onChange={onChange}
            required={true}
            placeholder="Jhone Due" 
        />
        <InputForm 
            label="Email" 
            type="email" 
            name="email" 
            value={registerData.email} 
            onChange={onChange}
            required={true}
            placeholder="email@gmail.com" 
        />
        <InputForm 
            label="Password" 
            type="password" 
            name="password" 
            value={registerData.password} 
            onChange={onChange}
            required={true}
            placeholder="***" />
        <InputForm 
            label="Confirm Password" 
            type="password" 
            name="confirm_password" 
            value={registerData.confirm_password} 
            onChange={onChange}
            required={true}
            placeholder="***" />
        <Button 
            label={isLoading ? 'Registering...' : 'Register'}
            type='submit'
            classname="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed disabled:hover:bg-teal-300" 
            disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default FormRegister;
