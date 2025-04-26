// Тип, соответствующий данным от API
export interface NewsResponse {
    id: string; // Guid в .NET приходит как строка
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    createdBy: number;
    updatedAt: string | null;
    updatedBy: number | null;
}

// Тип для фронтенда
export interface News {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    publishDate: string; // будет использоваться createdAt
    author: string; // Имя автора (в данном случае будем использовать ID автора)
}