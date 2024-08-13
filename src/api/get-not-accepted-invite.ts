import apiClient from "@/api-client.ts";

export default async function getNotAcceptedInvite(hackathon_id: number): Promise<string[]>  {
    const response = await apiClient({
        method: 'get',
        url: `/teams/hackathon/${hackathon_id}/pending_invitations`,
    })

    if (response.status == 200) {
        return response.data as string[]
    }

    return [];
}