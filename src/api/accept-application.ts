import { client } from "@/api-client.ts";

export default async function acceptApplication(response_id: number): Promise<boolean> {
    return await client.post<boolean>(`/teams/accept_application?app_id=${response_id}`).then(() => true).catch(() => false);
}