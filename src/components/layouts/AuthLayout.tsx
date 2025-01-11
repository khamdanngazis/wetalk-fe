import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  type?: 'login' | 'register';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children, type }) => {
  return (
    <div className="w-full max-w-sm border-2 border-gray-100 shadow-md rounded px-8 md:px-12 py-4">
      <h1 className="text-3xl font-bold mb-2 text-teal-600">{title}</h1>
      <p className="font-medium text-slate-500 mb-8">
        Welcome, Please enter your details
      </p>
      {children}
      <p className='text-sm text-center'>
            {type === 'login' ? 'do not have an account ?' : 'Already have an account ?'}{" "}
            {type === 'login' ? (
                <Link to="/register" className="text-teal-500 font-bold hover:underline cursor-pointer">Register</Link>
            ) : (
                <Link to="/login" className="text-teal-500 font-bold hover:underline cursor-pointer">Login</Link>
            )}
        </p>
    </div>
  );
};

export default AuthLayout;
