import React, {useState, useEffect} from 'react';
import FormLogin from '../components/fragments/FormLogin';
import AuthLayout from '../components/layouts/AuthLayout';
import { useNavigate} from 'react-router-dom';
import { loginUser } from '../services/auth.login.service';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            // Handle success (e.g., show a success message or redirect)
            console.log('Login successful:', response);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please try again.');
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
      <AuthLayout title="Login" type='login'>
        <FormLogin 
            onSubmit={handleSubmit}
            onChange={handleChange}
            loginData={formData}
            isLoading={isLoading}
            error={error}
            isErrorVisible={isErrorVisible}
        />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
