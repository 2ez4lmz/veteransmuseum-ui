import { FC } from 'react';

interface VeteransFiltersProps {
    onSearch: (search: string) => void;
    onFilterChange: (filter: string, value: string) => void;
    filters: {
        rank: string;
        militaryUnit: string;
    };
    ranks?: string[]; // Add optional ranks array prop
}

export const VeteransFilters: FC<VeteransFiltersProps> = ({ 
    onSearch, 
    onFilterChange,
    filters,
    ranks = [] // Default to empty array if not provided
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Поиск
                    </label>
                    <input
                        type="text"
                        placeholder="Поиск по имени, фамилии..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Звание
                    </label>
                    <select
                        value={filters.rank}
                        onChange={(e) => onFilterChange('rank', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    >
                        <option value="">Все звания</option>
                        {ranks.length > 0 ? (
                            // Display dynamic ranks if provided
                            ranks.map((rank, index) => (
                                <option key={index} value={rank}>{rank}</option>
                            ))
                        ) : (
                            // Fallback to static options if no ranks provided
                            <>
                                <option value="Рядовой">Рядовой</option>
                                <option value="Сержант">Сержант</option>
                                <option value="Лейтенант">Лейтенант</option>
                                <option value="Капитан">Капитан</option>
                                <option value="Майор">Майор</option>
                                <option value="Полковник">Полковник</option>
                                <option value="Генерал">Генерал</option>
                            </>
                        )}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Воинская часть
                    </label>
                    <input
                        type="text"
                        placeholder="Введите часть"
                        value={filters.militaryUnit}
                        onChange={(e) => onFilterChange('militaryUnit', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    />
                </div>
            </div>
        </div>
    );
};