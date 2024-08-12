import apiClient from "@/api-client.ts";
import {IHackathonStats} from "@/models/IHackathonStats";

export async function fetchHackathonStats(hackathonId: number): Promise<IHackathonStats | null> {
    const response = await apiClient({
        method: 'GET',
        url: `/teams/hackathon_summary/${hackathonId}`,
    })

    if (response.status === 200) {
        return response.data as IHackathonStats;
    }

    return null;
}