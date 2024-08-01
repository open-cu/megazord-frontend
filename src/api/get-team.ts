import { ITeam } from "@/models/ITeam.ts";
import apiClient from "@/api-client.ts";

export default async function getTeam(id: number): Promise<ITeam | null> {
    const response = await apiClient({
        method: 'get',
        url: `/teams/${id}`,
    })
    
    if (response.status === 200) {
        return {
            id: response.data.id,
            name: response.data.name,
            members: response.data.team_members.map((member: any) => ({
                id: member.id,
                name: member.name,
                email: member.email,
                role: member.is_organizator ? "organizer" : "user",
                age: member.age,
                city: member.city,
                workExp: member.work_experience,
            })),
            creator: response.data.creator,
            hackathonId: response.data.hackathon_id,
        }
    }
    
    return null
}