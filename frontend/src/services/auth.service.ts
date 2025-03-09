import api from './api';

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

const AuthService = {
    async signIn(data: SignInData): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/signin', data);
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error('Ошибка входа:', error);
            throw error;
        }
    },

    async signUp(data: SignUpData): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/signup', data);
            if (response.data.token) {
                // Проверяем, что user является объектом
                if (typeof response.data.user === 'object') {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    console.log('Ответ сервера:', response.data);
                } else {
                    throw new Error('Некорректные данные пользователя');
                }
            }
            return response.data;
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            throw error;
        }
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser(): any {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Ошибка парсинга данных пользователя:', error);
                this.logout(); // Очищаем некорректные данные
                return null;
            }
        }
        return null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};

export default AuthService;