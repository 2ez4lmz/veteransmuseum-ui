import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { createVeteran } from '../../api/api';

// Тип для формы создания ветерана
interface VeteranFormData {
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string;
    deathDate: string;
    biography: string;
    rank: string;
    awards: string;
    militaryUnit: string;
    battles: string;
    imageUrl: string;
}

export const AddVeteranPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Начальное состояние формы
    const initialFormData: VeteranFormData = {
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        deathDate: '',
        biography: '',
        rank: '',
        awards: '',
        militaryUnit: '',
        battles: '',
        imageUrl: ''
    };
    
    const [formData, setFormData] = useState<VeteranFormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof VeteranFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаем ошибку поля при изменении
        if (errors[name as keyof VeteranFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof VeteranFormData, string>> = {};
        
        // Обязательные поля
        if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно для заполнения';
        if (!formData.lastName.trim()) newErrors.lastName = 'Фамилия обязательна для заполнения';
        if (!formData.rank.trim()) newErrors.rank = 'Звание обязательно для заполнения';
        if (!formData.militaryUnit.trim()) newErrors.militaryUnit = 'Воинская часть обязательна для заполнения';
        
        // Даты
        if (formData.birthDate && formData.deathDate) {
            const birthDate = new Date(formData.birthDate);
            const deathDate = new Date(formData.deathDate);
            
            if (deathDate < birthDate) {
                newErrors.deathDate = 'Дата смерти не может быть раньше даты рождения';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setStatusMessage(null);
        
        try {
            // Преобразуем данные в формат API
            const veteranData = {
                ...formData,
                // Преобразуем локальные даты в UTC
                birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : undefined,
                deathDate: formData.deathDate ? new Date(formData.deathDate).toISOString() : undefined,
                imageUrl: formData.imageUrl || undefined
            };
            
            await createVeteran(veteranData);
            
            setStatusMessage({
                type: 'success',
                text: 'Ветеран успешно добавлен'
            });
            
            // Переход обратно к списку ветеранов после короткой задержки
            setTimeout(() => {
                navigate('/admin/veterans');
            }, 1500);
        } catch (error) {
            console.error('Ошибка при создании ветерана:', error);
            setStatusMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Ошибка при создании ветерана'
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <AdminLayout>
            <div className="pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Добавление ветерана</h1>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/veterans')}
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
                
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Личные данные */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Личные данные</h2>
                                
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Фамилия <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Имя <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Отчество
                                    </label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Дата рождения
                                    </label>
                                    <input
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Дата смерти
                                    </label>
                                    <input
                                        type="date"
                                        id="deathDate"
                                        name="deathDate"
                                        value={formData.deathDate}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.deathDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                    />
                                    {errors.deathDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.deathDate}</p>
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
                            </div>
                            
                            {/* Военные данные */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Военная служба</h2>
                                
                                <div>
                                    <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
                                        Воинское звание <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="rank"
                                        name="rank"
                                        value={formData.rank}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.rank ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                        placeholder="Полковник"
                                    />
                                    {errors.rank && (
                                        <p className="mt-1 text-sm text-red-600">{errors.rank}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="militaryUnit" className="block text-sm font-medium text-gray-700 mb-1">
                                        Воинская часть <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="militaryUnit"
                                        name="militaryUnit"
                                        value={formData.militaryUnit}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.militaryUnit ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm bg-white text-gray-900`}
                                        placeholder="123-я стрелковая дивизия"
                                    />
                                    {errors.militaryUnit && (
                                        <p className="mt-1 text-sm text-red-600">{errors.militaryUnit}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="battles" className="block text-sm font-medium text-gray-700 mb-1">
                                        Сражения (разделять запятыми)
                                    </label>
                                    <input
                                        type="text"
                                        id="battles"
                                        name="battles"
                                        value={formData.battles}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                        placeholder="Сталинградская битва, Курская битва"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="awards" className="block text-sm font-medium text-gray-700 mb-1">
                                        Награды (разделять запятыми)
                                    </label>
                                    <input
                                        type="text"
                                        id="awards"
                                        name="awards"
                                        value={formData.awards}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                        placeholder="Орден Красной Звезды, Медаль 'За отвагу'"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
                                        Биография
                                    </label>
                                    <textarea
                                        id="biography"
                                        name="biography"
                                        value={formData.biography}
                                        onChange={handleChange}
                                        rows={5}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 sm:text-sm bg-white text-gray-900"
                                        placeholder="Краткая биография и информация о боевом пути..."
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/veterans')}
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
            </div>
        </AdminLayout>
    );
};