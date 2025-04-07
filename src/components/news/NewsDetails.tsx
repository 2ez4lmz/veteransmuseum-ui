import React from 'react';
import { News } from '../../types/news';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface NewsDetailsProps {
    news: News;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({ news }) => {
    const formattedDate = format(new Date(news.publishDate), 'dd MMMM yyyy', { locale: ru });

    return (
        <div>
            <Link to="/news" className="inline-block mb-6 text-blue-600 hover:text-blue-800">
                ← Назад к новостям
            </Link>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{news.title}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                        <span className="mr-4">{formattedDate}</span>
                        <span>{news.author}</span>
                    </div>
                    
                    {news.imageUrl && (
                        <div className="mb-6">
                            <img 
                                src={news.imageUrl} 
                                alt={news.title} 
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    )}
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{news.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 