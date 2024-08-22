import apiClient from "@/api-client.ts";

export type NotAcceptedInviteUnit = {
    email: string,
    send_tg_status: boolean,
    send_email_status: boolean
}

export default async function getNotAcceptedInvite(hackathon_id: string): Promise<NotAcceptedInviteUnit[]>  {
    const response = await apiClient({
        method: 'get',
        url: `/teams/hackathon/${hackathon_id}/pending_invitations`,
    })

    if (response.status == 200) {
        return (response.data as string[]).map(email => {
            return {
                email: email,
                send_email_status: Math.random() < 0.5,
                send_tg_status: Math.random() < 0.5
            }
        })
    }

    return [];
}