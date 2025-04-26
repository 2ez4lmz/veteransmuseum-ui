import { FC } from 'react';

interface NewsFiltersProps {
    onSearch: (search: string) => void;
    onFilterChange: (filter: string, value: string) => void;
    filters: {
        dateFrom: string;
        dateTo: string;
    };
}

export const NewsFilters: FC<NewsFiltersProps> = ({ 
    onSearch, 
    onFilterChange,
    filters 
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Поиск
                    </label>
                    <input
                        type="text"
                        placeholder="Поиск по заголовку или содержанию..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    />
                </div>

                <div className="relative z-10">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Период
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            <input
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => onFilterChange('dateTo', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};