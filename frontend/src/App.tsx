// User, Mail, Lock,
// import { useState } from 'react';
// import { LogIn, UserPlus } from 'lucide-react';
// import Logo from './components/Logo';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
//
// function App() {
//     const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
//
//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 <div className="mb-8 flex justify-center">
//                     <Logo />
//                 </div>
//
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                     {/* Tabs */}
//                     <div className="flex border-b">
//                         <button
//                             className={`flex items-center justify-center gap-2 flex-1 py-4 font-medium transition-colors ${
//                                 activeTab === 'login'
//                                     ? 'text-indigo-700 border-b-2 border-indigo-700'
//                                     : 'text-gray-500 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setActiveTab('login')}
//                         >
//                             <LogIn size={18} />
//                             Авторизация
//                         </button>
//                         <button
//                             className={`flex items-center justify-center gap-2 flex-1 py-4 font-medium transition-colors ${
//                                 activeTab === 'register'
//                                     ? 'text-indigo-700 border-b-2 border-indigo-700'
//                                     : 'text-gray-500 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setActiveTab('register')}
//                         >
//                             <UserPlus size={18} />
//                             Регистрация
//                         </button>
//                     </div>
//
//                     {/* Form Container */}
//                     <div className="p-6">
//                         {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthService from './services/auth.service';
import Profile from './pages/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication status on app load
        const checkAuth = () => {
            const authenticated = AuthService.isAuthenticated();
            setIsAuthenticated(authenticated);
            setLoading(false);
        };

        checkAuth();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token' && !e.newValue) {
                setIsAuthenticated(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Navigate to="/login" replace />} />
                <Route path="/profile/me" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
