import { ITeam } from "@/models/ITeam.ts";

export interface IVacancySuggestion {
    id: number
    name: string
    keywords: string[]
    team: ITeam
}