import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NewsCard } from '../components/news/NewsCard';
import { VeteranCard } from '../components/veterans/VeteranCard';
import { Link } from 'react-router-dom';

// Временные данные для демонстрации
const mockNews = [
    {
        id: 1,
        title: 'Открытие нового зала музея',
        content: 'Сегодня состоялось торжественное открытие нового зала, посвященного ветеранам Великой Отечественной войны...',
        publishDate: '2024-04-01',
        author: 'Администрация музея',
        imageUrl: undefined
    },
    {
        id: 2,
        title: 'Встреча с ветеранами',
        content: 'В музее прошла традиционная встреча с ветеранами, на которой они поделились своими воспоминаниями...',
        publishDate: '2024-03-15',
        author: 'Пресс-служба',
        imageUrl: undefined
    }
];

const mockVeterans = [
    {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        birthDate: '1920-05-15',
        deathDate: '2005-03-20',
        rank: 'Полковник',
        awards: ['Орден Красной Звезды', 'Медаль "За отвагу"'],
        biography: 'Участник Великой Отечественной войны, прошел путь от рядового до полковника...',
        militaryUnit: '123-я стрелковая дивизия',
        battles: ['Сталинградская битва', 'Курская битва'],
        imageUrl: undefined
    }
];

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 w-full">
            <Header />
            <main className="flex-grow w-full">
                {/* Приветственная секция */}
                <section className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 md:py-24">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
                                Добро пожаловать в Музей Ветеранов
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
                                Мы храним память о героях Великой Отечественной войны и их подвигах.
                                Присоединяйтесь к нам в сохранении истории для будущих поколений.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    to="/veterans"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Наши ветераны
                                </Link>
                                <Link 
                                    to="/news"
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Последние новости
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ветераны */}
                <section className="w-full py-12 md:py-20 bg-white">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Наши ветераны
                            </h2>
                            <Link 
                                to="/veterans"
                                className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center gap-2"
                            >
                                Все ветераны
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                            {mockVeterans.map(veteran => (
                                <VeteranCard key={veteran.id} veteran={veteran} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Новости */}
                <section className="w-full py-12 md:py-20">
                    <div className="w-[60%] mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Последние новости
                            </h2>
                            <Link 
                                to="/news"
                                className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center gap-2"
                            >
                                Все новости
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                            {mockNews.map(news => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}; 