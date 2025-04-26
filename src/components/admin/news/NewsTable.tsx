import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { News } from '../../../types/news';
import { DeleteConfirmationModal } from '../../common/DeleteConfirmationModal';

interface NewsTableProps {
    news: News[];
    onDeleteNews: (id: string) => void;
}

export const NewsTable: React.FC<NewsTableProps> = ({ news, onDeleteNews }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
    
    // Функция для форматирования даты
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        
        try {
            const date = new Date(dateString);
            
            // Проверка на валидность даты
            if (isNaN(date.getTime())) {
                return '-';
            }
            
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return '-';
        }
    };
    
    const handleDelete = (newsItem: News) => {
        setNewsToDelete(newsItem);
        setDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (newsToDelete) {
            onDeleteNews(newsToDelete.id);
        }
        setDeleteModalOpen(false);
        setNewsToDelete(null);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Заголовок
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Дата публикации
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Автор
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {item.imageUrl ? (
                                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                                                <img 
                                                    className="h-10 w-10 rounded-md object-cover" 
                                                    src={item.imageUrl} 
                                                    alt={item.title} 
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 h-10 w-10 mr-4 bg-gray-200 rounded-md flex items-center justify-center">
                                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-md">
                                            {item.title}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(item.publishDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.author}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Link 
                                            to={`/admin/news/edit/${item.id}`} 
                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md"
                                        >
                                            Редактировать
                                        </Link>
                                        <button 
                                            type="button"
                                            onClick={() => handleDelete(item)}
                                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                title="Удаление новости"
                message={`Вы уверены, что хотите удалить новость "${newsToDelete?.title}"? Это действие невозможно отменить.`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </>
    );
};