import apiClient from "@/api-client.ts";

export default async function deleteParticipant(team_id: number, email: string): Promise<boolean>  {
    const response = await apiClient({
        method: 'delete',
        url: `/teams/${team_id}/remove_user`,
        data: {
            email: email
        }
    })
    return response.status == 202
}