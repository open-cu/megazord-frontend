import {client} from "@/api-client.ts";

export async function joinTeam(hackathon_id: string, emails: string[]): Promise<boolean> {
    const response = await client.post(
        `/hackathons/${hackathon_id}/create_teams`,
        { emails: emails },
        true
    );
    return response.status === 200;
}