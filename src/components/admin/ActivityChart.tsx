import React from 'react';

export const ActivityChart: React.FC = () => {
    // В реальном проекте здесь будет интеграция с библиотекой для графиков, например, Chart.js или Recharts
    
    return (
        <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Активность посещений</h2>
            
            <div className="h-64 flex items-end space-x-2">
                {/* Моковые данные для графика */}
                {[35, 45, 30, 65, 40, 80, 60].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">
                            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">+12%</span> по сравнению с прошлой неделей
                </div>
                <select className="text-sm border rounded p-1">
                    <option>Последняя неделя</option>
                    <option>Последний месяц</option>
                    <option>Последний год</option>
                </select>
            </div>
        </div>
    );
}; 