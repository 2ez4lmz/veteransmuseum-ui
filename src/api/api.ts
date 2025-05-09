const API_URL = 'https://localhost:8001/api';

import { authUtils } from '../utils/auth';

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
    const headers = {
        'Content-Type': 'application/json',
        ...authUtils.getAuthHeader()
    };
    
    const response = await fetch(`${API_URL}/veterans`, {
        method: 'POST',
        headers,
        body: JSON.stringify(veteranData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при создании ветерана');
    }
    
    return response.json();
};

// Функция для обновления данных ветерана
export const updateVeteran = async (id: string, veteranData: {
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
    const headers = {
        'Content-Type': 'application/json',
        ...authUtils.getAuthHeader()
    };
    
    const response = await fetch(`${API_URL}/veterans/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(veteranData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при обновлении данных ветерана');
    }
    
    // Проверяем заголовок Content-Type и длину ответа
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json') && response.headers.get('content-length') !== '0') {
        return response.json();
    } else {
        // Если сервер не возвращает JSON, возвращаем успешный статус
        return { success: true };
    }
};

// Функция для удаления ветерана
export const deleteVeteran = async (id: string) => {
    const response = await fetch(`${API_URL}/veterans/${id}`, {
        method: 'DELETE',
        headers: {
            ...authUtils.getAuthHeader()
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при удалении ветерана');
    }
    
    return true;
};

// Функция для создания новой новости
export const createNews = async (newsData: {
    title: string;
    content: string;
    imageUrl?: string;
}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...authUtils.getAuthHeader()
    };
    
    const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newsData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при создании новости');
    }
    
    return response.json();
};

// Функция для обновления новости
export const updateNews = async (id: string, newsData: {
    title: string;
    content: string;
    imageUrl?: string;
}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...authUtils.getAuthHeader()
    };
    
    const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(newsData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при обновлении новости');
    }
    
    // Проверяем заголовок Content-Type и длину ответа
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json') && response.headers.get('content-length') !== '0') {
        return response.json();
    } else {
        // Если сервер не возвращает JSON, возвращаем успешный статус
        return { success: true };
    }
};

// Функция для удаления новости
export const deleteNews = async (id: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
            ...authUtils.getAuthHeader()
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при удалении новости');
    }
    
    return true;
};

// Функция для аутентификации пользователя
export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ошибка при входе в систему');
    }
    
    return response.json();
};

// Функция для получения данных текущего пользователя
export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            ...authUtils.getAuthHeader()
        }
    });
    
    if (!response.ok) {
        throw new Error('Ошибка при получении данных пользователя');
    }
    
    return response.json();
};

// Функция для выхода из системы (только на клиенте)
export const logoutUser = () => {
    authUtils.removeToken();
    window.location.href = '/admin/login';
};