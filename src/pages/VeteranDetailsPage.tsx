import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VeteranDetails } from '../components/veterans/VeteranDetails';
import { Veteran } from '../types/veteran';

export const VeteranDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [veteran, setVeteran] = useState<Veteran | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVeteran = async () => {
            try {
                setLoading(true);
                // В будущем заменить на реальный API-запрос
                const mockVeteran: Veteran = {
                    id: Number(id),
                    firstName: 'Иван',
                    lastName: 'Иванов',
                    middleName: 'Иванович',
                    birthDate: '1920-05-15',
                    deathDate: '2005-03-20',
                    rank: 'Полковник',
                    awards: ['Орден Красной Звезды', 'Медаль "За отвагу"'],
                    biography: 'Участник Великой Отечественной войны, прошел путь от рядового до полковника. Отличился в боях под Сталинградом, где командовал ротой. После войны продолжил службу в вооруженных силах, занимая различные командные должности. Награжден многочисленными орденами и медалями за боевые заслуги и безупречную службу.',
                    militaryUnit: '123-я стрелковая дивизия',
                    battles: ['Сталинградская битва', 'Курская битва', 'Берлинская операция'],
                    imageUrl: undefined
                };
                setVeteran(mockVeteran);
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