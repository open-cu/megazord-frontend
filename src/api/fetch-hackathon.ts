import apiClient from "@/api-client.ts";
import { IHackathon } from "@/models/IHackathon.ts";

export default async function fetchHackathon(hackathon_id: number): Promise<IHackathon | null>  {
    const response = await apiClient({
        method: 'get',
        url: `/hackathons/${hackathon_id}`
    })

    if (response.status == 200) {
        return {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            imageCover: response.data.image_cover,
            min_participants: response.data.min_participants,
            max_participants: response.data.max_participants,
            participants: response.data.participants.map((e: any) => ({
                id: e.id,
                name: e.username,
                email: e.email,
                role: e.is_organizator ? 'organizer' : 'user',
                age: e.age,
                city: e.city,
                workExp: e.work_experience,
            })),
            teamsIds: [],
        }
    }

    return null
}