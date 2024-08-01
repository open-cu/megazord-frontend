import apiClient from "@/api-client.ts";

export interface TeamInviteEmailPayload {
    "email": string;
}

export default async function sendTeamInviteEmail(team_id: number, data: TeamInviteEmailPayload): Promise<boolean>  {
    
    const response = await apiClient({
        method: "post",
        url: `/teams/${team_id}/add_user`,
        data: data
    })

    return response.status == 201
}
