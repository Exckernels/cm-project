import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'https://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        // Проверка на JSON
        if (response.data && typeof response.data === 'string') {
            return Promise.reject(new Error('Ответ не является JSON'));
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use((config) => {
    const user = AuthService.getCurrentUser();
    if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
});


export default api;