import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { VeteranTable } from '../../components/admin/veterans/VeteranTable';
import { VeteranFilters } from '../../components/admin/veterans/VeteranFilters';
import { Pagination } from '../../components/common/Pagination';
import { Veteran } from '../../types/veteran';
import { fetchAllVeterans, deleteVeteran } from '../../api/api';

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
                const data = await fetchAllVeterans();
                setVeterans(data);
                setFilteredVeterans(data);
            } catch (error) {
                console.error('Ошибка при загрузке ветеранов:', error);
                setStatusMessage({
                    type: 'error',
                    text: 'Ошибка при загрузке списка ветеранов'
                });
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
    const handleDeleteVeteran = async (id: string) => {
        try {
            await deleteVeteran(id);
            
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
            console.error('Ошибка при удалении ветерана:', error);
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