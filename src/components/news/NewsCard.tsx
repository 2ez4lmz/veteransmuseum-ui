import { News } from '../../types/news';
import { Link } from 'react-router-dom';

interface NewsCardProps {
    news: News;
}

export const NewsCard = ({ news }: NewsCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="relative w-full h-48 md:h-56">
                <img 
                    src={news.imageUrl || '/default-avatar.webp'} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 md:p-6 flex-grow flex flex-col">
                <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{news.content}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 gap-2">
                    <span>{news.author}</span>
                    <span>{new Date(news.publishDate).toLocaleDateString()}</span>
                </div>
                <Link 
                    to={`/news/${news.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                >
                    Читать далее →
                </Link>
            </div>
        </div>
    );
}; 