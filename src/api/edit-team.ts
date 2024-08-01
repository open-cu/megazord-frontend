import apiClient from "@/api-client.ts";

type EditTeamPayload = {
    name: string
    vacancies: {
        id?: number;
        name: string;
        keywords: string[]
    }[]
}

export async function editTeam(id: number, payload: EditTeamPayload): Promise<boolean> {
    const response = await apiClient({
        method: 'patch',
        url: `/teams/edit_team?id=${id}`,
        data: payload,
    })
    
    return response.status === 200;
}