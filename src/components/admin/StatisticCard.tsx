import React from 'react';

interface StatisticCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    changeValue?: string | number;
    changeText?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    bgColor?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
    title,
    value,
    icon,
    changeValue,
    changeText,
    changeType = 'neutral',
    bgColor = 'bg-white'
}) => {
    const getChangeColorClass = () => {
        switch (changeType) {
            case 'positive':
                return 'text-green-600';
            case 'negative':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };
    
    const getChangeIcon = () => {
        if (changeType === 'positive') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
            );
        } else if (changeType === 'negative') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                </svg>
            );
        }
        return null;
    };
    
    return (
        <div className={`${bgColor} rounded-lg shadow-md p-5`}>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                    <div className="mt-1">
                        <span className="text-2xl font-semibold text-gray-900">{value}</span>
                    </div>
                </div>
                <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                    {icon}
                </div>
            </div>
            
            {(changeValue || changeText) && (
                <div className="mt-4 flex items-center">
                    {getChangeIcon()}
                    <span className={`text-sm ml-1 ${getChangeColorClass()}`}>
                        {changeValue && <span className="font-medium">{changeValue}</span>}
                        {changeText && <span> {changeText}</span>}
                    </span>
                </div>
            )}
        </div>
    );
}; 