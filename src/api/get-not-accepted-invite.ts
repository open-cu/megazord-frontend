import apiClient from "@/api-client.ts";

export type NotAcceptedInviteUnit = {
    email: string,
    send_tg_status: boolean,
    send_email_status: boolean
}

export default async function getNotAcceptedInvite(hackathon_id: string): Promise<NotAcceptedInviteUnit[]>  {
    const response = await apiClient({
        method: 'get',
        url: `/hackathons/${hackathon_id}/pending_invitations`,
    })

    if (response.status == 200) {
        return (response.data as NotAcceptedInviteUnit[]).map(unit => {
            return {
                email: unit.email,
                send_email_status: unit.send_email_status,
                send_tg_status: unit.send_tg_status
            }
        })
    }

    return [];
}