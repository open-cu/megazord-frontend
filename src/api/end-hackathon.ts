import {client} from "@/api-client";

export async function endHackathon(hackathonId: string) {
    return await client.post(`/hackathons/${hackathonId}/end`);
}