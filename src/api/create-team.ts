import {client} from "@/api-client.ts";

type CreateTeamPayload = {
    name: string
    vacancies: {
        id?: number;
        name: string;
        keywords: string[]
    }[]
}

export async function createTeam(id: number, payload: CreateTeamPayload): Promise<string | null> {
    const response = await client.post<{ id: string }>(
        `/teams/create?hackathon_id=${id}`,
        payload,
        true // Устанавливаем true, чтобы получить полный ответ
    );

    return response.data?.id;
}