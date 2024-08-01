import apiClient from "@/api-client.ts";
import {IVacancyResponse} from "@/models/IVacancyResponse";

export default async function getTeamVacanciesResponses(teamId: number): Promise<IVacancyResponse[]> {
    const response = await apiClient({
        method: 'get',
        url: `/teams/get_applies_for_team?team_id=${ teamId }`,
    })

    if (response.status == 200) {
        console.log('biba', response.data)
        return (response.data as any[]).map(json => {
            return {
                id: json.app_id,
                team: json.team,
                vacancy_id: json.vac,
                candidate_id: json.who_responsed
            }
        })
    }

    return []
}