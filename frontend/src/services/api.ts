import axios from 'axios';
// import AuthService from './auth.service';

const API_URL = 'https://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response; // сервер всегда должен возвращать JSON
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
    // const user = AuthService.getCurrentUser();
    // if (user?.accessToken) {
    //     config.headers.Authorization = `Bearer ${user.accessToken}`;
    // }
    // return config;
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;