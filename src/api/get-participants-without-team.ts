import apiClient from "@/api-client.ts";
import {IUser} from "@/models/IUser";

export default async function getParticipantsWithoutTeam(hackathon_id: string): Promise<IUser[]>  {
    const response = await apiClient({
        method: 'get',
        url: `/teams/hackathon/${hackathon_id}/participants_without_team`,
    })

    if (response.status == 200) {
        return response.data as IUser[]
    }

    return [];
}