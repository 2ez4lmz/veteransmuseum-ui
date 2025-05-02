import { Veteran } from '../../types/veteran';
import { Link } from 'react-router-dom';

interface VeteranCardProps {
    veteran: Veteran;
}

export const VeteranCard = ({ veteran }: VeteranCardProps) => {
    // Функция для ограничения текста биографии до заданного количества слов
    const truncateBiography = (text: string, wordLimit: number = 50): string => {
        if (!text) return '';
        const words = text.split(/\s+/);
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    // Получаем ограниченный список наград для отображения
    const displayedAwards = veteran.awards.slice(0, 3);
    const hiddenAwardsCount = veteran.awards.length - 3;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="relative w-full h-64 md:h-72 flex items-center justify-center bg-gray-100">
                <img 
                    src={veteran.imageUrl || '/default-avatar.webp'} 
                    alt={`${veteran.lastName} ${veteran.firstName}`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div className="p-4 md:p-6 flex-grow flex flex-col">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    {veteran.lastName} {veteran.firstName} {veteran.middleName}
                </h3>
                <p className="text-gray-600 mb-2">{veteran.rank}</p>
                <p className="text-gray-600 mb-4 flex-grow">{truncateBiography(veteran.biography)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {displayedAwards.map((award, index) => (
                        <span 
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                        >
                            {award}
                        </span>
                    ))}
                    {hiddenAwardsCount > 0 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                            {`и еще ${hiddenAwardsCount} ${hiddenAwardsCount === 1 ? 'награда' : hiddenAwardsCount < 5 ? 'награды' : 'наград'}`}
                        </span>
                    )}
                </div>
                <Link 
                    to={`/veterans/${veteran.id}`}
                    className="inline-block text-blue-600 hover:text-blue-800 font-medium"
                >
                    Подробнее →
                </Link>
            </div>
        </div>
    );
};