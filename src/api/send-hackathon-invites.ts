import apiClient from "@/api-client.ts";

export default async function sendHackathonInvites(hackathon_id: string, emails: string[]): Promise<boolean>  {
    const response = await apiClient({
        method: "post",
        url: `/hackathons/${hackathon_id}/send_invites`,
        data: { emails: emails.map(email => email.toLowerCase()) }
    })
    return response.status === 200
}
