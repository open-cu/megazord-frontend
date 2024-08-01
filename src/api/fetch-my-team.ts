import apiClient from "@/api-client.ts";
import { ITeam } from "@/models/ITeam";

export default async function fetchMyTeam(hackathon_id: number): Promise<ITeam | null> {
    const response = await apiClient({
        method: 'get', 
        url: `/hackathons/get_user_team/${hackathon_id}`,
    })

    if (response.status == 200) {

        const json = response.data

        return {
            id: json.id,
            name: json.name,
            members: json.team_members,
            hackathonId: json.hackathon,
            creator: json.creator,
        }
    }
    
    return null
}