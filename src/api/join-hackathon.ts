import apiClient from "@/api-client.ts";

type JoinTokenResponse = 'success' | 'already-join' | 'error'

export default async function joinHackathon(id: number, token: string): Promise<JoinTokenResponse> {
    const response = await apiClient({
        method: 'post',
        url: `/hackathons/join?hackathon_id=${id}&token=${token}`,
    })
    
    if (response.status === 200) {
        return 'success'
    }
    
    if (response.status === 403) {
        return 'already-join'
    }
    
    return 'error'
}