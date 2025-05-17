import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    Cloud,
    Users,
    LogOut,
    Mail,
    Edit2,
    Save,
    User as UserIcon,
} from 'lucide-react';
import AuthService from '../services/auth.service';
import api from '../services/api';

/** Данные, приходящие с сервера */
interface UserProfile {
    username: string;
    email: string;
    bio: string;
    profilePictureUrl: string;
}

function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<UserProfile>({
        username: '',
        email: '',
        bio: '',
        profilePictureUrl: 'https://en.wikipedia.org/wiki/File:Spring_Boot.svg',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/profile/me');
                setProfile({
                    username: data.username,
                    email: data.email,
                    bio: data.bio || '',
                    profilePictureUrl:
                        data.profilePictureUrl ||
                        'https://images.unsplash.com/photo-1614794484307-aae4d8a8c5f9?auto=format&fit=crop&w=1000&q=80',
                });
                setEditedBio(data.bio || '');
            } catch {
                setError('Не удалось загрузить профиль');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.put('/profile/me', { bio: editedBio });
            localStorage.setItem('user', JSON.stringify(data));
            setProfile(data);
            setIsEditing(false);
            setSuccess('Профиль успешно обновлён!');
            setTimeout(() => setSuccess(''), 3000);
        } catch {
            setError('Ошибка при обновлении профиля');
            setTimeout(() => setError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const btnBase =
        'group flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-gray-700';

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
            {/* ───────────── БОКОВОЕ МЕНЮ ───────────── */}
            <div className="fixed left-0 top-0 h-screen w-16 bg-gray-800/50 backdrop-blur-lg flex flex-col items-center space-y-8 p-4 z-50">
                {/* Communities */}
                <button onClick={() => navigate('/communities')} className={btnBase}>
                    <Home className="w-6 h-6 stroke-blue-500 group-hover:stroke-blue-600 stroke-2" />
                </button>

                {/* Profile */}
                <button onClick={() => navigate('/profile/me')} className={btnBase}>
                    <UserIcon className="w-6 h-6 stroke-white group-hover:stroke-gray-300 stroke-2" />
                </button>

                {/* Chats */}
                <button onClick={() => navigate('/chats')} className={btnBase}>
                    <Cloud className="w-6 h-6 stroke-blue-500 group-hover:stroke-blue-600 stroke-2" />
                </button>

                {/* Groups toggle */}
                <button onClick={() => setIsGroupsOpen((o) => !o)} className={btnBase}>
                    <Users className="w-6 h-6 stroke-white group-hover:stroke-gray-300 stroke-2" />
                </button>

                {isGroupsOpen && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 shadow-xl">
                        <button
                            onClick={() => {
                                navigate('/groups');
                                setIsGroupsOpen(false);
                            }}
                            className="block mb-2 text-white hover:bg-gray-700/50 rounded px-4 py-2 transition-colors"
                        >
                            Группы
                        </button>
                        <button
                            onClick={() => {
                                navigate('/communities');
                                setIsGroupsOpen(false);
                            }}
                            className="block text-white hover:bg-gray-700/50 rounded px-4 py-2 transition-colors"
                        >
                            Сообщества
                        </button>
                    </div>
                )}
            </div>

            {/* ───────────── ОСНОВНОЙ КОНТЕНТ ───────────── */}
            <div className="ml-20 max-w-4xl w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
                {/* header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors">
                        <LogOut className="w-5 h-5" /> Выйти
                    </button>
                </div>

                {(error || success) && (
                    <div className={`mb-6 p-4 rounded-lg ${error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>{error || success}</div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* avatar */}
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={profile.profilePictureUrl}
                            alt="Profile"
                            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/30"
                        />
                    </div>

                    {/* form */}
                    <div className="flex-1 space-y-6">
                        <div className="space-y-4">
                            {/* username */}
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={profile.username}
                                    disabled
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                                />
                            </div>

                            {/* email */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                                />
                            </div>

                            {/* bio */}
                            <div>
                                <label className="block text-gray-400 mb-2">Bio</label>
                                <textarea
                                    value={isEditing ? editedBio : profile.bio}
                                    onChange={(e) => setEditedBio(e.target.value)}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="w-full bg-gray-700/50 text-white rounded-lg p-4 disabled:opacity-50"
                                    placeholder="Расскажите о себе..."
                                />
                            </div>
                        </div>

                        {/* buttons */}
                        <div className="flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedBio(profile.bio);
                                        }}
                                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Save className="w-5 h-5" /> Сохранить
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Edit2 className="w-5 h-5" /> Редактировать
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
