import { FC } from 'react';
import { Veteran } from '../../types/veteran';
import { Link } from 'react-router-dom';

interface VeteranDetailsProps {
    veteran: Veteran;
}

export const VeteranDetails: FC<VeteranDetailsProps> = ({ veteran }) => {
    const formatDate = (date: string | null | undefined) => {
        if (!date) return 'Не указано';
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime())
            ? 'Некорректная дата'
            : parsedDate.toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Фото и основная информация */}
                <div className="space-y-6">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                        <img
                            src={veteran.imageUrl || '/default-avatar.webp'}
                            alt={`${veteran.lastName} ${veteran.firstName}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {veteran.lastName} {veteran.firstName} {veteran.middleName}
                        </h1>
                        <p className="text-xl text-gray-600">{veteran.rank}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {veteran.awards.map((award, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {award}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Детальная информация */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Биография</h2>
                        <p className="text-gray-600 leading-relaxed">{veteran.biography}</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Военная служба</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Воинская часть</p>
                                <p className="text-gray-900 font-medium">{veteran.militaryUnit}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Дата рождения</p>
                                <p className="text-gray-900 font-medium">{formatDate(veteran.birthDate)}</p>
                            </div>
                            {veteran.deathDate && (
                                <div>
                                    <p className="text-sm text-gray-500">Дата смерти</p>
                                    <p className="text-gray-900 font-medium">{formatDate(veteran.deathDate)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Участие в сражениях</h2>
                        <div className="flex flex-wrap gap-2">
                            {veteran.battles.map((battle, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {battle}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link
                            to="/veterans"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Вернуться к списку ветеранов
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}; 