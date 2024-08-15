import apiClient, {client} from "@/api-client";
import {IUser} from "@/models/IUser";
import {IHackathonStats} from "@/models/IHackathonStats";

export async function getParticipantsCsv(hackathonId: number): Promise<any> {
    const response = await client.get<IHackathonStats | null>(`/hackathons/${hackathonId}/export`).catch(() => null);
    console.log('', response)
    // if (response.status == 200) {
    //     return response.data as IUser[]
    // }

    return [];
}