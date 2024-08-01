import { IUser } from "@/models/IUser.ts";

export interface IHackathon {
    id: number;
    name: string;
    description: string;
    min_participants: number;
    max_participants: number;
    imageCover: string;
    participants: IUser[];
    teamsIds: number[];
}