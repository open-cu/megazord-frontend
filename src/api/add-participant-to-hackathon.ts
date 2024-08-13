import apiClient, {client} from "@/api-client.ts";

export default async function addParticipantToHackathon(hackathon_id: number, email: string): Promise<boolean> {
    return await client.post<boolean>(`/hackathons/${hackathon_id}/add_user`, { email: email }).catch(() => false);
}