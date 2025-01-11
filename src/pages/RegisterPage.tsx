import React, { useState, useEffect } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import FormRegister from '../components/fragments/FormRegister';
import { registerUser } from '../services/auth.register.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setIsErrorVisible(false);

        // Simple validation
        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            setIsErrorVisible(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                username: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // Handle success (e.g., show a success message or redirect)
            console.log('Registration successful:', response);
            alert('Registration successful! Please log in.');
            navigate('/login');
            
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
            setIsErrorVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isErrorVisible) {
          const timer = setTimeout(() => {
            setIsErrorVisible(false);
          }, 5000); 
    
          return () => clearTimeout(timer);
        }
    }, [isErrorVisible]);

    return (
        <div className="flex justify-center min-h-screen items-center">
        <AuthLayout title="Register" type='register'>
            <FormRegister 
                onSubmit={handleSubmit}
                onChange={handleChange}
                registerData={formData}
                isLoading={isLoading}
                error={error}
                isErrorVisible={isErrorVisible}
            />
            
        </AuthLayout>
        </div>
    );
};

export default RegisterPage;
