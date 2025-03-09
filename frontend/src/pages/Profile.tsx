// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { User, Mail, Edit2, Save, LogOut } from 'lucide-react';
// // import AuthService from '../services/auth.service';
// // import api from '../services/api';
// //
// // interface User {
// //     username: string;
// //     email: string;
// //     bio: string;
// //     profilePictureUrl: string;
// // }
// //
// // function Profile() {
// //     const navigate = useNavigate();
// //     const [profile, setProfile] = useState<User>({
// //         username: '',
// //         email: '',
// //         bio: '',
// //         profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
// //     });
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [editedProfile, setEditedProfile] = useState<User>(profile);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');
// //
// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             try {
// //                 const user = AuthService.getCurrentUser();
// //                 if (user) {
// //                     setProfile({
// //                         username: user.username,
// //                         email: user.email,
// //                         bio: user.bio || '',
// //                         profilePictureUrl: user.profilePictureUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
// //                     });
// //                     setEditedProfile({
// //                         username: user.username,
// //                         email: user.email,
// //                         bio: user.bio || '',
// //                         profilePictureUrl: user.profilePictureUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
// //                     });
// //                 }
// //             } catch (err) {
// //                 setError('Неудалось загрузить профиль');
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };
// //
// //         fetchProfile();
// //     }, []);
// //
// //     const handleLogout = () => {
// //         AuthService.logout();
// //         navigate('/login');
// //     };
// //
// //     const handleSave = async () => {
// //         try {
// //             setIsLoading(true);
// //             await api.put('/user/profile', editedProfile) .then(response => {
// //                 const updatedUser = response.data;
// //                 localStorage.setItem('user', JSON.stringify(updatedUser));
// //                 setProfile(updatedUser);
// //             }) .catch(error => {
// //                 console.error("Ошибка при обновлении профиля:", error.response);
// //                 if (error.response?.status === 401) {
// //                     console.log("Ошибка авторизации! Возможно, происходит логаут.");
// //                 }
// //             });
// //             localStorage.setItem('user', JSON.stringify(editedProfile));
// //             setProfile(editedProfile);
// //             setIsEditing(false);
// //             setSuccess('Профиль успешно обновлён!');
// //             setTimeout(() => setSuccess(''), 3000);
// //         } catch (err) {
// //             setError('Ошибка при обновлении профиля');
// //             setTimeout(() => setError(''), 3000);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };
// //
// //     if (isLoading) {
// //         return (
// //             <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //             </div>
// //         );
// //     }
// //
// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
// //             <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
// //                 <div className="flex justify-between items-center mb-8">
// //                     <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
// //                     <button
// //                         onClick={handleLogout}
// //                         className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition duration-200"
// //                     >
// //                         <LogOut className="w-5 h-5" />
// //                         Выйти
// //                     </button>
// //                 </div>
// //
// //                 {(error || success) && (
// //                     <div
// //                         className={`mb-6 p-4 rounded-lg ${error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
// //                         {error || success}
// //                     </div>
// //                 )}
// //
// //                 <div className="flex flex-col md:flex-row gap-8">
// //                     <div className="flex flex-col items-center space-y-4">
// //                         <div className="relative">
// //                             <img
// //                                 src={profile.profilePictureUrl}
// //                                 alt="Profile"
// //                                 className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/30"
// //                             />
// //                             {isEditing && (
// //                                 <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition duration-200">
// //                                     <Edit2 className="w-5 h-5" />
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </div>
// //
// //                     <div className="flex-1 space-y-6">
// //                         <div className="space-y-4">
// //                             <div className="relative">
// //                                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
// //                                 <input
// //                                     type="text"
// //                                     value={isEditing ? editedProfile.username : profile.username}
// //                                     onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
// //                                     disabled={!isEditing}
// //                                     className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 disabled:opacity-50"
// //                                 />
// //                             </div>
// //
// //                             <div className="relative">
// //                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
// //                                 <input
// //                                     type="email"
// //                                     value={isEditing ? editedProfile.email : profile.email}
// //                                     onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
// //                                     disabled={!isEditing}
// //                                     className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 disabled:opacity-50"
// //                                 />
// //                             </div>
// //
// //                             <div>
// //                                 <label className="block text-gray-400 mb-2">Bio</label>
// //                                 <textarea
// //                                     value={isEditing ? editedProfile.bio : profile.bio}
// //                                     onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
// //                                     disabled={!isEditing}
// //                                     rows={4}
// //                                     className="w-full bg-gray-700/50 text-white rounded-lg p-4 disabled:opacity-50"
// //                                     placeholder="Расскажите о себе..."
// //                                 />
// //                             </div>
// //                         </div>
// //
// //                         <div className="flex justify-end space-x-4">
// //                             {isEditing ? (
// //                                 <>
// //                                     <button
// //                                         onClick={() => {
// //                                             setIsEditing(false);
// //                                             setEditedProfile(profile);
// //                                         }}
// //                                         className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
// //                                     >
// //                                         Отмена
// //                                     </button>
// //                                     <button
// //                                         onClick={handleSave}
// //                                         className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
// //                                     >
// //                                         <Save className="w-5 h-5" />
// //                                         Сохранить
// //                                     </button>
// //                                 </>
// //                             ) : (
// //                                 <button
// //                                     onClick={() => setIsEditing(true)}
// //                                     className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
// //                                 >
// //                                     <Edit2 className="w-5 h-5" />
// //                                     Редактировать
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// //
// // export default Profile;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Edit2, Save, LogOut } from 'lucide-react';
import AuthService from '../services/auth.service';
import api from '../services/api';

interface User {
    username: string;
    email: string;
    bio: string;
    profilePictureUrl: string;
}

function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User>({
        username: '',
        email: '',
        bio: '',
        profilePictureUrl: 'https://en.wikipedia.org/wiki/File:Spring_Boot.svg'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile/me');
                const userData = response.data;
                // сохраняем в стейт
                // setProfile(userData);
                setProfile({
                    username: userData.username,
                    email: userData.email,
                    bio: userData.bio || '',
                    profilePictureUrl: userData.profilePictureUrl || 'https://images.unsplash.com/...'
                });
                setEditedBio(userData.bio || '');
            } catch (err) {
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
            await api.put('/profile/me', { bio: editedBio }).then(response => {
                const updatedUser = response.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setProfile(updatedUser);
            }).catch(error => {
                console.error("Ошибка при обновлении профиля:", error.response);
                if (error.response?.status === 401) {
                    console.log("Ошибка авторизации! Возможно, происходит логаут.");
                }
            });

            setProfile(prev => ({ ...prev, bio: editedBio }));
            setIsEditing(false);
            setSuccess('Профиль успешно обновлён!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Ошибка при обновлении профиля');
            setTimeout(() => setError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition duration-200">
                        <LogOut className="w-5 h-5" />
                        Выйти
                    </button>
                </div>

                {(error || success) && (
                    <div className={`mb-6 p-4 rounded-lg ${error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                        {error || success}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <img
                                src={profile.profilePictureUrl}
                                alt="Profile"
                                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/30"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={profile.username}
                                    disabled
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                                />
                            </div>

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

                        <div className="flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedBio(profile.bio);
                                        }}
                                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                                    >
                                        <Save className="w-5 h-5" />
                                        Сохранить
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    <Edit2 className="w-5 h-5" />
                                    Редактировать
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