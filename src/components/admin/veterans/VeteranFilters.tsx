import React, { useState, useRef } from 'react';

interface VeteranFiltersProps {
    onSearch: (query: string) => void;
    onFilterByRank: (rank: string) => void;
    onFilterByUnit: (unit: string) => void;
    ranks: string[];
    units: string[];
}

export const VeteranFilters: React.FC<VeteranFiltersProps> = ({ 
    onSearch, 
    onFilterByRank, 
    onFilterByUnit,
    ranks,
    units
}) => {
    const [query, setQuery] = useState('');
    const searchTimeout = useRef<number | null>(null);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        
        // Debounce search to avoid too many re-renders
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        
        searchTimeout.current = setTimeout(() => {
            onSearch(value.trim());
        }, 300);
    };
    
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Поиск */}
                <div className="col-span-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                            placeholder="Поиск по имени или фамилии"
                            value={query}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                
                {/* Фильтр по званию */}
                <div className="col-span-1">
                    <label htmlFor="rank-filter" className="block text-sm font-medium text-gray-700 mb-1">Звание</label>
                    <select
                        id="rank-filter"
                        className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        onChange={(e) => onFilterByRank(e.target.value)}
                    >
                        <option value="">Все звания</option>
                        {ranks.map((rank, index) => (
                            <option key={index} value={rank}>{rank}</option>
                        ))}
                    </select>
                </div>
                
                {/* Фильтр по воинской части */}
                <div className="col-span-1">
                    <label htmlFor="unit-filter" className="block text-sm font-medium text-gray-700 mb-1">Воинская часть</label>
                    <select
                        id="unit-filter"
                        className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        onChange={(e) => onFilterByUnit(e.target.value)}
                    >
                        <option value="">Все части</option>
                        {units.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};