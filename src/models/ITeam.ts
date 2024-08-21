import { IUser } from "@/models/IUser.ts";

export interface ITeam {
    id: number
    name: string
    hackathonId: string
    members: IUser[]
    creator: number
}