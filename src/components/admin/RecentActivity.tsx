import React from 'react';

interface ActivityItem {
    id: number;
    action: string;
    description: string;
    date: string;
    user: string;
    status?: 'success' | 'pending' | 'error';
}

export const RecentActivity: React.FC = () => {
    const activities: ActivityItem[] = [
        {
            id: 1,
            action: 'Добавлен новый ветеран',
            description: 'Петров Александр Николаевич',
            date: '5 минут назад',
            user: 'Админ',
            status: 'success'
        },
        {
            id: 2,
            action: 'Обновлена новость',
            description: 'Визит губернатора в музей',
            date: '2 часа назад',
            user: 'Редактор',
            status: 'success'
        },
        {
            id: 3,
            action: 'Загрузка фотографий',
            description: 'Материалы с последнего мероприятия',
            date: '3 часа назад',
            user: 'Модератор',
            status: 'pending'
        },
        {
            id: 4,
            action: 'Правка биографии',
            description: 'Иванов Иван Иванович',
            date: 'Вчера',
            user: 'Админ',
            status: 'success'
        },
        {
            id: 5,
            action: 'Ошибка загрузки документа',
            description: 'Невалидный формат файла',
            date: 'Вчера',
            user: 'Модератор',
            status: 'error'
        }
    ];
    
    const getStatusClass = (status?: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Последняя активность</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                    Показать все
                </button>
            </div>
            
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                {activity.user.charAt(0)}
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium text-gray-800">{activity.action}</div>
                                    <div className="text-sm text-gray-600">{activity.description}</div>
                                </div>
                                <div>
                                    <span className={`text-xs rounded-full px-2 py-1 ${getStatusClass(activity.status)}`}>
                                        {activity.status === 'success' && 'Успешно'}
                                        {activity.status === 'pending' && 'В процессе'}
                                        {activity.status === 'error' && 'Ошибка'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                <span>{activity.user}</span>
                                <span className="mx-1">•</span>
                                <span>{activity.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 