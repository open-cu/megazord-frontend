import {client} from "@/api-client";

export async function startHackathon(hackathonId: number) {
    return await client.post(`/hackathons/${hackathonId}/start`);
}