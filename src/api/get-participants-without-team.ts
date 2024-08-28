import apiClient from "@/api-client.ts";
import {IUser} from "@/models/IUser";
import {IResume} from "@/models/IResume";

export default async function getParticipantsWithoutTeam(hackathon_id: string): Promise<IResume[]>  {
    const response = await apiClient({
        method: 'get',
        url: `/hackathons/${hackathon_id}/participants_without_team`,
    })

    if (response.status == 200) {
        return response.data as IResume[]
    }

    return [];
}