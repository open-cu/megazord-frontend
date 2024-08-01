import apiClient from "@/api-client.ts";
import { ITeamVacancy } from "@/models/ITeamVacancy";

export default async function fetchTeamVacancies(team_id: number): Promise<ITeamVacancy[]>  {
    const response = await apiClient({
        method: 'get', 
        url: '/teams/team_vacancies',
        params: { id: team_id},
    })
    
    if (response.status == 200) {
        return (response.data as any[]).map(json => {
            return { 
                id: json.id,
                name: json.name,
                keywords: json.keywords,
                // userId: json.user_id,
            }
        })
    }
    
    return []
}