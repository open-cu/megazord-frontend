import apiClient from "@/api-client.ts";

export interface CreateHackathonPayload {
    name: string,
    description: string,
    min_participants: number,
    max_participants: number,
    participants: string[],
}

export default async function createHackathon(file: File, data: CreateHackathonPayload): Promise<boolean> {
    const form = new FormData()
    form.append('image_cover', file)
    form.append('body', JSON.stringify({
        ...data,
        min_participants: 1,
    }))

    const response = await apiClient({
        method: "post",
        url: `/hackathons/`,
        data: form
    })

    return response.status == 201
}