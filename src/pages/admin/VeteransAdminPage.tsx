import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { VeteranTable } from '../../components/admin/veterans/VeteranTable';
import { VeteranFilters } from '../../components/admin/veterans/VeteranFilters';
import { Pagination } from '../../components/common/Pagination';
import { Veteran } from '../../types/veteran';

const ITEMS_PER_PAGE = 10;

export const VeteransAdminPage: React.FC = () => {
    const [veterans, setVeterans] = useState<Veteran[]>([]);
    const [filteredVeterans, setFilteredVeterans] = useState<Veteran[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [rankFilter, setRankFilter] = useState('');
    const [unitFilter, setUnitFilter] = useState('');
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    // Уникальные звания и воинские части для фильтров
    const ranks = Array.from(new Set(veterans.map(v => v.rank))).sort();
    const units = Array.from(new Set(veterans.map(v => v.militaryUnit))).sort();
    
    // Загрузка данных
    useEffect(() => {
        const fetchVeterans = async () => {
            try {
                setIsLoading(true);
                // В реальном проекте здесь будет API-запрос
                // Моковые данные
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
                    {
                        id: 2,
                        firstName: 'Петр',
                        lastName: 'Петров',
                        middleName: 'Петрович',
                        birthDate: '1918-10-23',
                        deathDate: '1998-11-05',
                        rank: 'Майор',
                        awards: ['Орден Красного Знамени', 'Медаль "За оборону Москвы"'],
                        biography: 'Воевал на Западном фронте, участвовал в обороне Москвы...',
                        militaryUnit: '45-й стрелковый полк',
                        battles: ['Битва за Москву', 'Ржевская битва'],
                        imageUrl: undefined
                    },
                    {
                        id: 3,
                        firstName: 'Алексей',
                        lastName: 'Смирнов',
                        middleName: 'Николаевич',
                        birthDate: '1922-02-10',
                        deathDate: '2010-07-15',
                        rank: 'Лейтенант',
                        awards: ['Орден Отечественной войны II степени'],
                        biography: 'Командовал взводом разведки, участвовал в боях на Курской дуге...',
                        militaryUnit: '123-я стрелковая дивизия',
                        battles: ['Курская битва', 'Битва за Днепр'],
                        imageUrl: undefined
                    }
                ];
                
                setVeterans(mockVeterans);
                setFilteredVeterans(mockVeterans);
            } catch (error) {
                console.error('Ошибка при загрузке ветеранов:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchVeterans();
    }, []);
    
    // Применение фильтров и поиска
    useEffect(() => {
        let result = [...veterans];
        
        // Поиск
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(vet => 
                vet.firstName.toLowerCase().includes(query) || 
                vet.lastName.toLowerCase().includes(query) || 
                (vet.middleName && vet.middleName.toLowerCase().includes(query))
            );
        }
        
        // Фильтр по званию
        if (rankFilter) {
            result = result.filter(vet => vet.rank === rankFilter);
        }
        
        // Фильтр по воинской части
        if (unitFilter) {
            result = result.filter(vet => vet.militaryUnit === unitFilter);
        }
        
        setFilteredVeterans(result);
        setCurrentPage(1); // Сбрасываем страницу при изменении фильтров
    }, [veterans, searchQuery, rankFilter, unitFilter]);
    
    // Удаление ветерана
    const handleDeleteVeteran = (id: number) => {
        try {
            // В реальном проекте здесь будет API-запрос на удаление
            const updatedVeterans = veterans.filter(vet => vet.id !== id);
            setVeterans(updatedVeterans);
            
            setStatusMessage({
                type: 'success',
                text: 'Ветеран успешно удален'
            });
            
            // Автоматически скрываем сообщение через 3 секунды
            setTimeout(() => {
                setStatusMessage(null);
            }, 3000);
        } catch (error) {
            setStatusMessage({
                type: 'error',
                text: 'Ошибка при удалении ветерана'
            });
        }
    };
    
    // Пагинация
    const totalPages = Math.ceil(filteredVeterans.length / ITEMS_PER_PAGE);
    const paginatedVeterans = filteredVeterans.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Управление ветеранами</h1>
                <Link 
                    to="/admin/veterans/add" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Добавить ветерана
                </Link>
            </div>
            
            {/* Сообщение о статусе */}
            {statusMessage && (
                <div className={`mb-4 px-4 py-3 rounded-md ${
                    statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {statusMessage.text}
                </div>
            )}
            
            {/* Фильтры */}
            <VeteranFilters 
                onSearch={setSearchQuery} 
                onFilterByRank={setRankFilter}
                onFilterByUnit={setUnitFilter}
                ranks={ranks}
                units={units}
            />
            
            {/* Загрузка */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {filteredVeterans.length === 0 ? (
                        <div className="bg-white shadow rounded-lg p-8 text-center">
                            <p className="text-gray-500 text-lg mb-4">Ветераны не найдены</p>
                            <p className="text-gray-400">Попробуйте изменить параметры поиска или добавьте новых ветеранов</p>
                        </div>
                    ) : (
                        <>
                            {/* Таблица */}
                            <VeteranTable 
                                veterans={paginatedVeterans} 
                                onDeleteVeteran={handleDeleteVeteran} 
                            />
                            
                            {/* Информация о количестве */}
                            <div className="mt-4 text-sm text-gray-500">
                                Показано {paginatedVeterans.length} из {filteredVeterans.length} ветеранов
                            </div>
                            
                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <Pagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </AdminLayout>
    );
}; 