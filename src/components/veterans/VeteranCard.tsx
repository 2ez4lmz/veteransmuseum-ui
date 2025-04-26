import { Veteran } from '../../types/veteran';
import { Link } from 'react-router-dom';

interface VeteranCardProps {
    veteran: Veteran;
}

export const VeteranCard = ({ veteran }: VeteranCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="relative w-full h-64 md:h-72">
                <img 
                    src={veteran.imageUrl || '/default-avatar.webp'} 
                    alt={`${veteran.lastName} ${veteran.firstName}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 md:p-6 flex-grow flex flex-col">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    {veteran.lastName} {veteran.firstName} {veteran.middleName}
                </h3>
                <p className="text-gray-600 mb-2">{veteran.rank}</p>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{veteran.biography}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {veteran.awards.map((award, index) => (
                        <span 
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                        >
                            {award}
                        </span>
                    ))}
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