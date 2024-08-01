import apiClient from "@/api-client.ts";

export async function getPercentWithTeam(hackathonId: number): Promise<number> {
    const response = await apiClient({
        method: 'GET', 
        url: `/teams/analytic/${hackathonId}`,
    })
    
    if (response.status === 200) {        
        return Math.round(response.data.procent as number);
    }
    
    return 0;
}