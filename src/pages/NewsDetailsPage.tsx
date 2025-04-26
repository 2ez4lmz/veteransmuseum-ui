import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NewsDetails } from '../components/news/NewsDetails';
import { News, NewsResponse } from '../types/news';
import { fetchNewsById } from '../api/api';

export const NewsDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNewsDetails = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const data: NewsResponse = await fetchNewsById(id);
                
                // Преобразуем данные в формат News
                const transformedNews: News = {
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    imageUrl: data.imageUrl || undefined,
                    publishDate: data.createdAt,
                    author: `Автор ID: ${data.createdBy}` // В реальном приложении здесь нужно получать имя автора
                };
                
                setNews(transformedNews);
            } catch (err) {
                setError('Произошла ошибка при загрузке новости');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getNewsDetails();
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