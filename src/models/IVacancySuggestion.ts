import { ITeam } from "@/models/ITeam.ts";

export interface IVacancySuggestion {
    id: string
    name: string
    keywords: string[]
    team: ITeam
}