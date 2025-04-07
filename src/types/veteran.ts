export interface Veteran {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string;
    deathDate?: string;
    rank: string;
    awards: string[];
    biography: string;
    imageUrl?: string;
    militaryUnit: string;
    battles: string[];
} 