import { IUser } from "@/models/IUser.ts";

export interface IMemberSuggestion {
    user: IUser,
    matches: string[],
    bio: string,
}