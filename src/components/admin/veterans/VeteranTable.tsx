import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Veteran } from '../../../types/veteran';
import { DeleteConfirmationModal } from '../../common/DeleteConfirmationModal';

interface VeteranTableProps {
    veterans: Veteran[];
    onDeleteVeteran: (id: number) => void;
}

export const VeteranTable: React.FC<VeteranTableProps> = ({ veterans, onDeleteVeteran }) => {
    const [sortColumn, setSortColumn] = useState<keyof Veteran>('lastName');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [veteranToDelete, setVeteranToDelete] = useState<Veteran | null>(null);
    
    // Сортировка ветеранов
    const sortedVeterans = [...veterans].sort((a, b) => {
        if (sortColumn === 'lastName' || sortColumn === 'firstName' || sortColumn === 'middleName' || sortColumn === 'rank') {
            const aValue = a[sortColumn]?.toLowerCase() || '';
            const bValue = b[sortColumn]?.toLowerCase() || '';
            
            if (sortDirection === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        }
        
        if (sortColumn === 'birthDate' || sortColumn === 'deathDate') {
            const aValue = a[sortColumn] ? new Date(a[sortColumn]!) : new Date(0);
            const bValue = b[sortColumn] ? new Date(b[sortColumn]!) : new Date(0);
            
            if (sortDirection === 'asc') {
                return aValue.getTime() - bValue.getTime();
            } else {
                return bValue.getTime() - aValue.getTime();
            }
        }
        
        return 0;
    });
    
    const handleSort = (column: keyof Veteran) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };
    
    const getSortIcon = (column: keyof Veteran) => {
        if (column !== sortColumn) return null;
        
        return (
            <span className="ml-1 inline-block">
                {sortDirection === 'asc' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </span>
        );
    };
    
    const handleDelete = (veteran: Veteran) => {
        setVeteranToDelete(veteran);
        setDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (veteranToDelete) {
            onDeleteVeteran(veteranToDelete.id);
        }
        setDeleteModalOpen(false);
        setVeteranToDelete(null);
    };
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };
    
    return (
        <>
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('lastName')}
                            >
                                <div className="flex items-center">
                                    ФИО
                                    {getSortIcon('lastName')}
                                </div>
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('birthDate')}
                            >
                                <div className="flex items-center">
                                    Дата рождения
                                    {getSortIcon('birthDate')}
                                </div>
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('rank')}
                            >
                                <div className="flex items-center">
                                    Звание
                                    {getSortIcon('rank')}
                                </div>
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Подразделение
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Действия</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedVeterans.map((veteran) => (
                            <tr key={veteran.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img 
                                                className="h-10 w-10 rounded-full object-cover" 
                                                src={veteran.imageUrl || '/default-avatar.webp'} 
                                                alt="" 
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {veteran.lastName} {veteran.firstName} {veteran.middleName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{formatDate(veteran.birthDate)}</div>
                                    {veteran.deathDate && (
                                        <div className="text-sm text-gray-500">† {formatDate(veteran.deathDate)}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{veteran.rank}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{veteran.militaryUnit}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Link 
                                            to={`/admin/veterans/edit/${veteran.id}`} 
                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md"
                                        >
                                            Редактировать
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(veteran)}
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
                title="Удаление ветерана"
                message={`Вы уверены, что хотите удалить ветерана "${veteranToDelete?.lastName} ${veteranToDelete?.firstName} ${veteranToDelete?.middleName || ''}"? Это действие невозможно отменить.`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </>
    );
}; 