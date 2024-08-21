import {client} from "@/api-client";

export async function startHackathon(hackathonId: string) {
    return await client.post(`/hackathons/${hackathonId}/start`);
}