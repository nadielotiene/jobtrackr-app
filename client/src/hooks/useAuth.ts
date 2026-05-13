import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

interface AuthPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: { id: string; email: string };
}

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: AuthPayload) =>
            client.post<AuthResponse>('/auth/login', data).then((r) => r.data),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        },
    })
};

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: AuthPayload) =>
            client.post<AuthResponse>('/auth/register', data).then((r) => r.data),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        },
    })
};
