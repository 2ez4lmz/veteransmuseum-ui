import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VeteranCard } from '../components/veterans/VeteranCard';
import { VeteransFilters } from '../components/veterans/VeteransFilters';
import { Pagination } from '../components/common/Pagination';
import { Veteran, VeteranResponse } from '../types/veteran';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Получение данных с API
    useEffect(() => {
        const fetchVeterans = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://localhost:8001/api/veterans');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке списка ветеранов');
                }
                const data: VeteranResponse[] = await response.json();

                // Преобразуем данные в формат Veteran
                const transformedVeterans: Veteran[] = data.map(veteran => ({
                    id: veteran.id,
                    firstName: veteran.firstName,
                    lastName: veteran.lastName,
                    middleName: veteran.middleName,
                    birthDate: veteran.birthDate || '',
                    deathDate: veteran.deathDate || undefined,
                    rank: veteran.rank,
                    awards: veteran.awards ? veteran.awards.split(',').map(item => item.trim()) : [],
                    biography: veteran.biography,
                    militaryUnit: veteran.militaryUnit,
                    battles: veteran.battles ? veteran.battles.split(',').map(item => item.trim()) : [],
                    imageUrl: veteran.imageUrl || undefined,
                }));

                setVeterans(transformedVeterans);
                setFilteredVeterans(transformedVeterans);
            } catch (err) {
                setError('Произошла ошибка при загрузке данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVeterans();
    }, []);

    // Фильтрация и поиск
    useEffect(() => {
        let result = [...veterans];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(veteran => 
                veteran.firstName.toLowerCase().includes(query) ||
                veteran.lastName.toLowerCase().includes(query) ||
                (veteran.middleName && veteran.middleName.toLowerCase().includes(query))
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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Загрузка данных...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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