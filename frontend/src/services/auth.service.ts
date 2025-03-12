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

export interface SignUpResponse {
    message: string;
    success: boolean;

    user?: {
        id: string;
        email: string;
        username: string;
    };
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
    async signUp(data: SignUpData): Promise<SignUpResponse> {
        try{
        if (!data.username?.trim() || !data.email?.trim() || !data.password.trim()) {
            throw new Error('Все поля должны быть заполнены');
        }

        // console.log('Отправка данных регистрации:', JSON.stringify(data));

        const response = await api.post<SignUpResponse>('/auth/signup', data);

        // console.log('Полный ответ сервера:', {
        //     status: response.status,
        //     data: response.data,
        //     headers: response.headers
        // });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Ошибка регистрации');
            }

            console.log('Регистрация успешна:', response.data);
            window.dispatchEvent(new Event('authChange'));


            return response.data;
        } catch (error: any) {
            let errorMessage = 'Ошибка регистрации';

            if (error.response) {
                console.error('Детали ошибки:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });

                errorMessage = error.response.data?.error ||
                    error.response.data?.message ||
                    errorMessage;
            }

            console.error('Полная ошибка регистрации:', error);

            throw new Error(errorMessage);
        }
    },

    async signIn(data: SignInData): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/signin', data);

            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                window.dispatchEvent(new Event('authChange'));
            }
            return response.data;
        } catch (error: any) {
            console.error('Ошибка входа:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Ошибка входа');
        }
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.dispatchEvent(new Event('authChange'));
    },

    getCurrentUser(): any {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Ошибка парсинга данных пользователя:', error);
                this.logout();
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