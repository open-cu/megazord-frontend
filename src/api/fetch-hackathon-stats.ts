import { client } from "@/api-client.ts";
import {IHackathonStats} from "@/models/IHackathonStats";

export async function fetchHackathonStats(hackathonId: string): Promise<IHackathonStats | null> {
    return await client.get<IHackathonStats | null>(`/teams/hackathon_summary/${hackathonId}`).catch(() => null);
}