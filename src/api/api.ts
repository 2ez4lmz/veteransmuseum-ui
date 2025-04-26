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

// Функция для создания нового ветерана
export const createVeteran = async (veteranData: {
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate?: string;
    deathDate?: string;
    biography: string;
    rank: string;
    awards: string;
    militaryUnit: string;
    battles: string;
    imageUrl?: string;
}) => {
    const token = localStorage.getItem('token'); // Предполагаем, что токен хранится в localStorage
    
    const response = await fetch(`${API_URL}/veterans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(veteranData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при создании ветерана');
    }
    
    return response.json();
};

// Функция для обновления данных ветерана
export const updateVeteran = async (id: number, veteranData: {
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate?: string;
    deathDate?: string;
    biography: string;
    rank: string;
    awards: string;
    militaryUnit: string;
    battles: string;
    imageUrl?: string;
}) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/veterans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(veteranData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при обновлении данных ветерана');
    }
    
    return response.json();
};

// Функция для удаления ветерана
export const deleteVeteran = async (id: number) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/veterans/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при удалении ветерана');
    }
    
    return true;
};