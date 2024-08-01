export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    age: number | null;
    city: string | null;
    workExp: number | null;
}

export type UserRole = "organizer" | "user";