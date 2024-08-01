import apiClient from "@/api-client.ts";

export default async function addParticipantToHackathon(hackathon_id: number, email: string): Promise<boolean>  {
    const response = await apiClient({
        method: 'post',
        url: `/hackathons/${hackathon_id}/add_user`,
        data: {
            email: email
        }
    })
    return response.status == 201
}