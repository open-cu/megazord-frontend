import { ITeamVacancy } from "@/models/ITeamVacancy.ts";
import apiClient from "@/api-client.ts";

export default async function getTeamVacancies(teamId: number): Promise<ITeamVacancy[]> {
    const response = await apiClient({
        method: 'get',
        url: `/teams/team_vacancies?id=${ teamId }`,
    })

    if (response.status === 200) {
        return response.data
    }

    return []
}