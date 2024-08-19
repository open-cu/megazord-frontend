import apiClient from "@/api-client.ts";

export default async function sendHackathonInvites(hackathon_id: number, emails: string[]): Promise<boolean>  {
    const response = await apiClient({
        method: "post",
        url: `/hackathons/${hackathon_id}/send_invites`,
        data: { emails: emails }
    })
    return response.status === 200
}
