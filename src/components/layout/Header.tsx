import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white sticky top-0 z-50 w-full">
            <nav className="w-[60%] mx-auto px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl md:text-2xl font-bold">
                        Музей Ветеранов
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/news" className="hover:text-gray-300 transition-colors">
                            Новости
                        </Link>
                        <Link to="/veterans" className="hover:text-gray-300 transition-colors">
                            Ветераны
                        </Link>
                        <Link to="/admin/login" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                            Вход для администраторов
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        <Link 
                            to="/news" 
                            className="block py-2 hover:text-gray-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Новости
                        </Link>
                        <Link 
                            to="/veterans" 
                            className="block py-2 hover:text-gray-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Ветераны
                        </Link>
                        <Link 
                            to="/admin/login" 
                            className="block py-2 text-gray-400 hover:text-gray-300 text-sm transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Вход для администраторов
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};