import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NewsCard } from '../components/news/NewsCard';
import { VeteranCard } from '../components/veterans/VeteranCard';
import { Link } from 'react-router-dom';
import { Veteran, VeteranResponse } from '../types/veteran';
import { News, NewsResponse } from '../types/news';
import { fetchAllNews } from '../api/api';

export const HomePage = () => {
    const [veterans, setVeterans] = useState<Veteran[]>([]);
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newsError, setNewsError] = useState<string | null>(null);

    // Получение данных ветеранов с API
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

                // Отображаем только 5 ветеранов на главной странице
                setVeterans(transformedVeterans.slice(0, 5));
            } catch (err) {
                setError('Произошла ошибка при загрузке данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVeterans();
    }, []);

    // Получение всех новостей и выбор последних
    useEffect(() => {
        const getNews = async () => {
            try {
                setNewsLoading(true);
                const data: NewsResponse[] = await fetchAllNews();
                
                // Преобразуем данные в формат News
                const transformedNews: News[] = data.map(item => ({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    imageUrl: item.imageUrl || undefined,
                    publishDate: item.createdAt,
                    author: `Автор ID: ${item.createdBy}` // В реальном приложении здесь можно получать имя автора
                }));
                
                // Сортируем по дате (от новых к старым) и берем последние 5
                const sortedNews = transformedNews.sort((a, b) => 
                    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                ).slice(0, 5);
                
                setNews(sortedNews);
            } catch (err) {
                setNewsError('Ошибка при загрузке новостей');
                console.error(err);
                
                // Резервные данные на случай ошибки
                setNews([
                    {
                        id: '1',
                        title: 'Открытие нового зала музея',
                        content: 'Сегодня состоялось торжественное открытие нового зала, посвященного ветеранам Великой Отечественной войны...',
                        publishDate: '2024-04-01',
                        author: 'Администрация музея',
                        imageUrl: undefined
                    },
                    {
                        id: '2',
                        title: 'Встреча с ветеранами',
                        content: 'В музее прошла традиционная встреча с ветеранами, на которой они поделились своими воспоминаниями...',
                        publishDate: '2024-03-15',
                        author: 'Пресс-служба',
                        imageUrl: undefined
                    }
                ]);
            } finally {
                setNewsLoading(false);
            }
        };

        getNews();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 w-full">
            <Header />
            <main className="flex-grow w-full">
                {/* Приветственная секция */}
                <section className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 md:py-24">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
                                Добро пожаловать в музей ветеранов Башкортостана
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
                                Мы храним память о героях Великой Отечественной войны и их подвигах.
                                Присоединяйтесь к нам в сохранении истории для будущих поколений.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    to="/veterans"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Наши ветераны
                                </Link>
                                <Link 
                                    to="/news"
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Последние новости
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ветераны */}
                <section className="w-full py-12 md:py-20 bg-white">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Наши ветераны
                            </h2>
                            <Link 
                                to="/veterans"
                                className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center gap-2"
                            >
                                Все ветераны
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : veterans.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Ветераны не найдены</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                                {veterans.map(veteran => (
                                    <VeteranCard key={veteran.id} veteran={veteran} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Новости */}
                <section className="w-full py-12 md:py-20">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Последние новости
                            </h2>
                            <Link 
                                to="/news"
                                className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center gap-2"
                            >
                                Все новости
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        {newsLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : newsError ? (
                            <div className="text-center py-8 text-red-600">
                                {newsError}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                                {news.map(item => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};