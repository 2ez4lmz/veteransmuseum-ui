import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VeteranDetails } from '../components/veterans/VeteranDetails';
import { Veteran, VeteranResponse } from '../types/veteran';

export const VeteranDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [veteran, setVeteran] = useState<Veteran | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVeteran = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://localhost:8001/api/veterans/${id}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных ветерана');
                }
                const data: VeteranResponse = await response.json();
        
                // Преобразуем данные в формат Veteran
                const transformedVeteran: Veteran = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    birthDate: data.birthDate || '', // Преобразуем null в пустую строку
                    deathDate: data.deathDate || undefined,
                    rank: data.rank,
                    awards: data.awards ? data.awards.split(',').map(item => item.trim()) : [], // Разделяем строку на массив
                    biography: data.biography,
                    militaryUnit: data.militaryUnit,
                    battles: data.battles ? data.battles.split(',').map(item => item.trim()) : [], // Разделяем строку на массив
                    imageUrl: data.imageUrl || undefined,
                };
        
                setVeteran(transformedVeteran);
            } catch (err) {
                setError('Произошла ошибка при загрузке данных ветерана');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVeteran();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Загрузка данных...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!veteran) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Ветеран не найден</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <VeteranDetails veteran={veteran} />
                </div>
            </main>
            <Footer />
        </div>
    );
};