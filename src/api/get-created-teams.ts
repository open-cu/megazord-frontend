import apiClient, { client } from "@/api-client.ts";
import {IResume} from "@/models/IResume";

export interface ICreatedTeam {
    id: string,
    hackathon_id: string,
    name: string,
    creator_id: string,
    resumes: IResume[],

}

export async function getCreatedTeams(hackathon_id: string): Promise<ICreatedTeam[] | null> {
    const response = await apiClient({
        method: 'get',
        url: `/hackathons/${hackathon_id}/hand_created_teams`,
    })
    if(response.status == 200) {
        return response.data
    } else {
        return []
    }
}