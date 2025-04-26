import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchNewsById, updateNews } from '../../api/api';

// Тип для формы редактирования новости
interface NewsFormData {
    title: string;
    content: string;
    imageUrl: string;
}

export const EditNewsPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    // Начальное состояние формы
    const initialFormData: NewsFormData = {
        title: '',
        content: '',
        imageUrl: ''
    };
    
    const [formData, setFormData] = useState<NewsFormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof NewsFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    // Загрузка данных новости
    useEffect(() => {
        const fetchNews = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                const data = await fetchNewsById(id);
                
                setFormData({
                    title: data.title,
                    content: data.content,
                    imageUrl: data.imageUrl || ''
                });
            } catch (error) {
                console.error('Ошибка при загрузке новости:', error);
                setStatusMessage({
                    type: 'error',
                    text: 'Ошибка при загрузке данных новости'
                });
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchNews();
    }, [id]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаем ошибку поля при изменении
        if (errors[name as keyof NewsFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof NewsFormData, string>> = {};
        
        // Обязательные поля
        if (!formData.title.trim()) newErrors.title = 'Заголовок обязателен для заполнения';
        if (!formData.content.trim()) newErrors.content = 'Содержание обязательно для заполнения';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id || !validateForm()) return;
        
        setIsSubmitting(true);
        setStatusMessage(null);
        
        try {
            // Преобразуем данные в формат API
            const newsData = {
                ...formData,
                imageUrl: formData.imageUrl || undefined
            };
            
            await updateNews(id, newsData);
            
            setStatusMessage({
                type: 'success',
                text: 'Новость успешно обновлена'
            });
            
            // Переход обратно к списку новостей после короткой задержки
            setTimeout(() => {
                navigate('/admin/news');
            }, 1500);
        } catch (error) {
            console.error('Ошибка при обновлении новости:', error);
            setStatusMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Ошибка при обновлении новости'
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <AdminLayout>
            <div className="pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Редактирование новости</h1>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Назад к списку
                    </button>
                </div>
                
                {/* Сообщение статуса */}
                {statusMessage && (
                    <div className={`mb-6 px-4 py-3 rounded-md ${
                        statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {statusMessage.text}
                    </div>
                )}
                
                {/* Индикатор загрузки */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="bg-white shadow rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Заголовок <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                        URL изображения
                                    </label>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                        Содержание <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        rows={10}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.content ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/news')}
                                    className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Сохранение...
                                        </>
                                    ) : 'Сохранить'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};