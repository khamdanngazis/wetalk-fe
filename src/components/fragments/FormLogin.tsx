import React from 'react';
import InputForm from '../elements/InputForm';
import Button from '../elements/Button';

interface LoginProps {
    onSubmit: (e:React.FormEvent) => void;
    loginData: {
        email: string;
        password: string;
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
    error?: string;
    isErrorVisible?: boolean;
}


const FormLogin:React.FC<LoginProps> = ({ onSubmit, loginData, onChange, isLoading = false, error="", isErrorVisible=false}) => {
  return (
    <form onSubmit={onSubmit}>
        {error && isErrorVisible && (
            <div className="text-rose-500 mb-4 transition-opacity opacity-100 animate-fade-out">
            {error}
            </div>
        )}
      <div className="mb-6">
        <InputForm 
            label="Email" 
            type="email" 
            name="email" 
            value={loginData.email} 
            onChange={onChange}
            required={true}
            placeholder="email@gmail.com" 
        />
        <InputForm 
            label="Password" 
            type="password" 
            name="password" 
            value={loginData.password} 
            required={true}
            onChange={onChange}
            placeholder="***" 
        />
        <Button 
            label={isLoading ? 'Loading...' : 'Login'}
            type='submit'
            classname="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed disabled:hover:bg-teal-300" 
            disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default FormLogin;
