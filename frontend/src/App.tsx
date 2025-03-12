import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthService from './services/auth.service';
import Profile from './pages/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                <Route path="/login" element={
                    !isAuthenticated ? <Login /> : <Navigate to="/profile/me" replace />
                } />
                <Route path="/profile/me" element={
                    isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
                } />
                <Route path="/*" element={
                    <Navigate to={isAuthenticated ? "/profile/me" : "/login"} replace />
                } />
            </Routes>
        </Router>
    );
}

export default App;
