import React, { useState } from 'react';

interface NewsFiltersProps {
    onSearch: (query: string) => void;
    onDateFilter: (date: string) => void;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({ onSearch, onDateFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateFilter(value);
        onDateFilter(value);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Фильтры</h2>
            
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Поиск по заголовку..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow rounded-l-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 py-2 text-sm font-medium"
                    >
                        Поиск
                    </button>
                </div>
            </form>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Дата публикации
                    </label>
                    <input
                        type="date"
                        id="date-filter"
                        value={dateFilter}
                        onChange={handleDateChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                    />
                </div>
                
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setDateFilter('');
                            onSearch('');
                            onDateFilter('');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            </div>
        </div>
    );
};