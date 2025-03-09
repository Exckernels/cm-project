import React, { useState } from 'react';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthService, { SignInData, SignUpData } from '../services/auth.service';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setEmail('');
        setPassword('');
        setUsername('');
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isRegistering) {
                if (!username) {
                    throw new Error('Пожалуйста, введите никнейм');
                }

                const signUpData: SignUpData = { username, email, password };
                await AuthService.signUp(signUpData);
                setSuccess('Регистрация успешна!');
            } else {
                const signInData: SignInData = { email, password };
                await AuthService.signIn(signInData);
                setSuccess('Вход выполнен успешно!');
                navigate('/profile/me');
            }
        } catch (err: any) {
            console.error('Authentication error:', err);
            setError(err.response?.data?.message || err.message || 'Ошибка авторизации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-12 md:gap-24">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-400">Добро пожаловать в</h1>
                    <div className="text-[#3B4B82] text-6xl md:text-7xl font-light tracking-[0.3em] mt-4">
                        COMMUNITY
                    </div>
                    <p className="text-gray-400 text-lg">Объединяйтесь в сообщества и общайтесь легко.</p>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isRegistering ? 'Регистрация' : 'Вход'}
                        </h2>
                        <p className="text-gray-400 mb-6">
                            {isRegistering ? 'Создайте новый аккаунт' : 'Войдите в свой аккаунт'}
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-200">
                                <AlertCircle className="w-5 h-5" />
                                <span>{success}</span>
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isRegistering && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Никнейм"
                                        className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Пароль"
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Загрузка...' : isRegistering ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            {!isRegistering && (
                                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                                    Забыли пароль?
                                </a>
                            )}
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <span className="text-gray-500">или</span>
                            </div>
                            <button
                                onClick={toggleForm}
                                className="w-full mt-4 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-3 rounded-lg transition duration-200"
                            >
                                {isRegistering ? 'Уже есть аккаунт? Войти' : 'Создать новый аккаунт'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

