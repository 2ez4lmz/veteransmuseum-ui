const API_URL = 'https://localhost:8001/api';

export const fetchAllNews = async () => {
    const response = await fetch(`${API_URL}/news`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке новостей');
    }
    return response.json();
};

export const fetchNewsById = async (id: string) => {
    const response = await fetch(`${API_URL}/news/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке новости');
    }
    return response.json();
};

// Для ветеранов (уже существует в проекте, но собираем в одном файле)
export const fetchAllVeterans = async () => {
    const response = await fetch(`${API_URL}/veterans`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке списка ветеранов');
    }
    return response.json();
};

export const fetchVeteranById = async (id: string) => {
    const response = await fetch(`${API_URL}/veterans/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных ветерана');
    }
    return response.json();
};