// Тип, соответствующий данным от API
export interface VeteranResponse {
    id: string; // Guid в .NET приходит как строка
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string | null; // DateTime? приходит как строка или null
    deathDate: string | null;
    biography: string;
    rank: string;
    awards: string; // строка, например, "Орден Красной Звезды, Медаль \"За отвагу\""
    militaryUnit: string;
    battles: string; // строка, например, "Сталинградская битва, Курская битва"
    imageUrl: string | null;
    createdAt: string;
    createdBy: number;
    updatedAt: string | null;
    updatedBy: number | null;
}

// Тип для фронтенда
export interface Veteran {
    id: string; // Оставим строку, так как Guid — это строка
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string;
    deathDate?: string;
    rank: string;
    awards: string[];
    biography: string;
    militaryUnit: string;
    battles: string[];
    imageUrl?: string;
}