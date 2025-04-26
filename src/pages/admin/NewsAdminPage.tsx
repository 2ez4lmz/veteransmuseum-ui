import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { NewsTable } from '../../components/admin/news/NewsTable';
import { NewsFilters } from '../../components/admin/news/NewsFilters';
import { Pagination } from '../../components/common/Pagination';
import { News } from '../../types/news';
import { fetchAllNews, deleteNews } from '../../api/api';

const ITEMS_PER_PAGE = 10;

export const NewsAdminPage: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    // Загрузка данных
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAllNews();
                setNews(data);
                setFilteredNews(data);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
                setStatusMessage({
                    type: 'error',
                    text: 'Ошибка при загрузке списка новостей'
                });
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchNews();
    }, []);
    
    // Применение фильтров и поиска
    useEffect(() => {
        let result = [...news];
        
        // Поиск по заголовку
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                item.title.toLowerCase().includes(query)
            );
        }
        
        // Фильтр по дате
        if (dateFilter) {
            const filterDate = new Date(dateFilter).toISOString().split('T')[0];
            result = result.filter(item => {
                const itemDate = new Date(item.publishDate).toISOString().split('T')[0];
                return itemDate === filterDate;
            });
        }
        
        setFilteredNews(result);
        setCurrentPage(1); // Сбрасываем страницу при изменении фильтров
    }, [news, searchQuery, dateFilter]);
    
    // Удаление новости
    const handleDeleteNews = async (id: string) => {
        try {
            await deleteNews(id);
            
            const updatedNews = news.filter(item => item.id !== id);
            setNews(updatedNews);
            
            setStatusMessage({
                type: 'success',
                text: 'Новость успешно удалена'
            });
            
            // Автоматически скрываем сообщение через 3 секунды
            setTimeout(() => {
                setStatusMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
            setStatusMessage({
                type: 'error',
                text: 'Ошибка при удалении новости'
            });
        }
    };
    
    // Пагинация
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Управление новостями</h1>
                <Link 
                    to="/admin/news/add" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Добавить новость
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
            <NewsFilters 
                onSearch={setSearchQuery} 
                onDateFilter={setDateFilter}
            />
            
            {/* Загрузка */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {filteredNews.length === 0 ? (
                        <div className="bg-white shadow rounded-lg p-8 text-center">
                            <p className="text-gray-500 text-lg mb-4">Новости не найдены</p>
                            <p className="text-gray-400">Попробуйте изменить параметры поиска или добавьте новые новости</p>
                        </div>
                    ) : (
                        <>
                            {/* Таблица */}
                            <NewsTable 
                                news={paginatedNews} 
                                onDeleteNews={handleDeleteNews} 
                            />
                            
                            {/* Информация о количестве */}
                            <div className="mt-4 text-sm text-gray-500">
                                Показано {paginatedNews.length} из {filteredNews.length} новостей
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