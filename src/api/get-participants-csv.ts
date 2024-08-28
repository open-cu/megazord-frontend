import apiClient, {client} from "@/api-client";
import {IUser} from "@/models/IUser";
import {IHackathonStats} from "@/models/IHackathonStats";

export async function getParticipantsCsv(hackathonId: string): Promise<any> {
    await client.get<IHackathonStats | null>(`/hackathons/${hackathonId}/export`).catch(() => null);
}