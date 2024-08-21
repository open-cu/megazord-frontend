import { IUser } from "@/models/IUser.ts";

export interface ITeam {
    id: string
    name: string
    hackathonId: string
    members: IUser[]
    creator: number
}