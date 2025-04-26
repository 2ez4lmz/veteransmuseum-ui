import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../api/api';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export const AdminHeader: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Получение данных пользователя при загрузке компонента
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserData();
    }, []);
    
    // Закрытие выпадающего меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // Функция для выхода из системы
    const handleLogout = () => {
        logoutUser();
    };
    
    // Получение инициалов пользователя
    const getUserInitials = () => {
        if (!user) return 'АА';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    };
    
    return (
        <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center py-3 px-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Панель управления</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 focus:outline-none bg-white px-3 py-2 rounded-lg shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {getUserInitials()}
                            </div>
                            <span className="text-gray-800 font-medium">
                                {isLoading ? 'Загрузка...' : user ? `${user.firstName} ${user.lastName}` : 'Админ Админович'}
                            </span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link 
                                    to="/admin/profile" 
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Профиль
                                </Link>
                                <Link 
                                    to="/admin/settings" 
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Настройки
                                </Link>
                                <hr className="my-1" />
                                <button 
                                    className="block w-full text-left px-4 py-2 text-white bg-gray-800 hover:bg-white hover:text-gray-800 transition-colors"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};