import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NewsDetails } from '../components/news/NewsDetails';
import { News } from '../types/news';

export const NewsDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                // В будущем заменить на реальный API-запрос
                const mockNews: News = {
                    id: Number(id),
                    title: 'Открытие нового зала музея',
                    content: 'Сегодня состоялось торжественное открытие нового зала, посвященного ветеранам Великой Отечественной войны. В мероприятии приняли участие представители администрации города, ветераны и их родственники.\n\nНовый зал включает в себя уникальные экспонаты, фотографии и документы военных лет. Посетители могут увидеть личные вещи ветеранов, награды, письма с фронта и многое другое.\n\nЭкспозиция разделена на несколько тематических секций, каждая из которых рассказывает о разных аспектах военной жизни и подвигах наших ветеранов. Интерактивные стенды позволяют более подробно познакомиться с историями участников войны.',
                    publishDate: '2024-04-01',
                    author: 'Администрация музея',
                    imageUrl: undefined
                };
                setNews(mockNews);
            } catch (err) {
                setError('Произошла ошибка при загрузке новости');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

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

    if (!news) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Новость не найдена</p>
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
                    <NewsDetails news={news} />
                </div>
            </main>
            <Footer />
        </div>
    );
}; 