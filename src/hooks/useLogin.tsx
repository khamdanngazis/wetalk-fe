import { useEffect, useState } from 'react';
import { getUser } from '../services/auth.login.service';
import { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log('useLogin call');
        const token = localStorage.getItem('token');
        if (token) {
            const user = getUser(token);
            setUser(user);
        }else{
            navigate('/login');
        }
    }, []);
    return user
}
