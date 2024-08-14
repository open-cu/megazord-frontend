import {client} from "@/api-client";

export async function endHackathon(hackathonId: number) {
    return await client.post(`/hackathons/${hackathonId}/end`);
}