import React from 'react';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 ml-64">
                <AdminHeader />
                
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}; 