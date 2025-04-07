 import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NewsCard } from '../components/news/NewsCard';
import { NewsFilters } from '../components/news/NewsFilters';
import { Pagination } from '../components/common/Pagination';
import { News } from '../types/news';

const ITEMS_PER_PAGE = 9;

export const NewsPage = () => {
    const [news, setNews] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Моковые данные (в будущем заменить на API)
    useEffect(() => {
        const mockNews: News[] = [
            {
                id: 1,
                title: 'Открытие нового зала музея',
                content: 'Сегодня состоялось торжественное открытие нового зала, посвященного ветеранам Великой Отечественной войны. В мероприятии приняли участие представители администрации города, ветераны и их родственники.',
                publishDate: '2024-04-01',
                author: 'Администрация музея',
                imageUrl: undefined
            },
            {
                id: 2,
                title: 'Встреча с ветеранами',
                content: 'В музее прошла традиционная встреча с ветеранами, на которой они поделились своими воспоминаниями о военных годах. Мероприятие собрало более 50 участников.',
                publishDate: '2024-03-15',
                author: 'Пресс-служба',
                imageUrl: undefined
            },
            {
                id: 3,
                title: 'Новая экспозиция',
                content: 'В музее открылась новая экспозиция, посвященная 80-летию Победы в Великой Отечественной войне. В ней представлены уникальные экспонаты и документы.',
                publishDate: '2024-02-20',
                author: 'Администрация музея',
                imageUrl: undefined
            }
        ];
        setNews(mockNews);
        setFilteredNews(mockNews);
    }, []);

    // Фильтрация и поиск
    useEffect(() => {
        let result = [...news];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query)
            );
        }

        if (filters.dateFrom) {
            result = result.filter(item => 
                new Date(item.publishDate) >= new Date(filters.dateFrom)
            );
        }

        if (filters.dateTo) {
            result = result.filter(item => 
                new Date(item.publishDate) <= new Date(filters.dateTo)
            );
        }

        setFilteredNews(result);
        setCurrentPage(1);
    }, [news, searchQuery, filters]);

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
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Новости музея
                    </h1>

                    <NewsFilters
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />

                    {filteredNews.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Новости не найдены
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedNews.map(item => (
                                    <NewsCard key={item.id} news={item} />
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