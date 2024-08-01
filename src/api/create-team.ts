import apiClient from "@/api-client.ts";

type CreateTeamPayload = {
    name: string
    vacancies: {
        id?: number;
        name: string;
        keywords: string[]
    }[]
}

export async function createTeam(id: number, payload: CreateTeamPayload): Promise<number | null> {
    const response = await apiClient({
        method: 'post',
        url: `/teams/create?hackathon_id=${id}`,
        data: payload,
    })
    
    return response.data?.id;
}