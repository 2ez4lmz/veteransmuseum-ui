import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VeteranCard } from '../components/veterans/VeteranCard';
import { VeteransFilters } from '../components/veterans/VeteransFilters';
import { Pagination } from '../components/common/Pagination';
import { Veteran } from '../types/veteran';

const ITEMS_PER_PAGE = 9;

export const VeteransPage = () => {
    const [veterans, setVeterans] = useState<Veteran[]>([]);
    const [filteredVeterans, setFilteredVeterans] = useState<Veteran[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        rank: '',
        militaryUnit: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Моковые данные (в будущем заменить на API)
    useEffect(() => {
        const mockVeterans: Veteran[] = [
            {
                id: 1,
                firstName: 'Иван',
                lastName: 'Иванов',
                middleName: 'Иванович',
                birthDate: '1920-05-15',
                deathDate: '2005-03-20',
                rank: 'Полковник',
                awards: ['Орден Красной Звезды', 'Медаль "За отвагу"'],
                biography: 'Участник Великой Отечественной войны, прошел путь от рядового до полковника...',
                militaryUnit: '123-я стрелковая дивизия',
                battles: ['Сталинградская битва', 'Курская битва'],
                imageUrl: undefined
            },
            // Добавьте больше моковых данных по необходимости
        ];
        setVeterans(mockVeterans);
        setFilteredVeterans(mockVeterans);
    }, []);

    // Фильтрация и поиск
    useEffect(() => {
        let result = [...veterans];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(veteran => 
                veteran.firstName.toLowerCase().includes(query) ||
                veteran.lastName.toLowerCase().includes(query) ||
                veteran.middleName?.toLowerCase().includes(query)
            );
        }

        if (filters.rank) {
            result = result.filter(veteran => veteran.rank === filters.rank);
        }

        if (filters.militaryUnit) {
            result = result.filter(veteran => 
                veteran.militaryUnit.toLowerCase().includes(filters.militaryUnit.toLowerCase())
            );
        }

        setFilteredVeterans(result);
        setCurrentPage(1);
    }, [veterans, searchQuery, filters]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filter: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filter]: value
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Пагинация
    const totalPages = Math.ceil(filteredVeterans.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVeterans = filteredVeterans.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Наши ветераны
                    </h1>

                    <VeteransFilters
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />

                    {filteredVeterans.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Ветераны не найдены
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedVeterans.map(veteran => (
                                    <VeteranCard key={veteran.id} veteran={veteran} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}; 