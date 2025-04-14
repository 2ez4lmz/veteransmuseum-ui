import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatisticCard } from '../../components/admin/StatisticCard';
import { ActivityChart } from '../../components/admin/ActivityChart';
import { RecentActivity } from '../../components/admin/RecentActivity';

export const DashboardPage: React.FC = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Дашборд</h1>
            
            {/* Статистические карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatisticCard 
                    title="Всего ветеранов"
                    value={125}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    }
                    changeValue="+5"
                    changeText="за последний месяц"
                    changeType="positive"
                />
                
                <StatisticCard 
                    title="Новости"
                    value={48}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                    }
                    changeValue="+12"
                    changeText="за последний месяц"
                    changeType="positive"
                />
                
                <StatisticCard 
                    title="Посетители"
                    value={1254}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                    }
                    changeValue="+24%"
                    changeText="по сравнению с прошлым месяцем"
                    changeType="positive"
                />
                
                <StatisticCard 
                    title="Загрузки"
                    value={32}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    }
                    changeValue="-5"
                    changeText="по сравнению с прошлым месяцем"
                    changeType="negative"
                />
            </div>
            
            {/* График и активность */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
            
            {/* Быстрые действия */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Быстрые действия</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3">
                        <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>Добавить ветерана</span>
                    </button>
                    
                    <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3">
                        <div className="rounded-full p-2 bg-green-100 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>Создать новость</span>
                    </button>
                    
                    <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3">
                        <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>Загрузить фото</span>
                    </button>
                    
                    <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3">
                        <div className="rounded-full p-2 bg-orange-100 text-orange-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                        </div>
                        <span>Настройки</span>
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}; 