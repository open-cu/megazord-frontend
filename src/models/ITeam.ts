import { IUser } from "@/models/IUser.ts";

export interface ITeam {
    id: number
    name: string
    hackathonId: number
    members: IUser[]
    creator: number
}