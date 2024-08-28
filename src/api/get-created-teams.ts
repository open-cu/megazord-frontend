import { client } from "@/api-client.ts";
import {IHackathonStats} from "@/models/IHackathonStats";
import {IResume} from "@/models/IResume";

export interface ICreatedTeam {
    id: string,
    hackathon_id: string,
    name: string,
    creator_id: string,
    resumes: IResume[],

}

export async function getCreatedTeams(hackathon_id: string): Promise<ICreatedTeam[] | null> {
    return await client.get<ICreatedTeam[] | null>(`/hackathons/${hackathon_id}/hand_created_teams`).catch(() => null);
}