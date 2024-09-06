import apiClient from "@/api-client.ts";
import { ITeam } from "@/models/ITeam";

export default async function fetchTeams(hackathon_id: string): Promise<ITeam[]>  {
    const response = await apiClient({
        method: 'get',
        url: "/teams",
        params: { hackathon_id: hackathon_id },
    })

    if (response.status == 200) {
        return (response.data as any[]).map(json => {
            return { 
                id: json.id,
                hackathonId: json.hackathon,
                name: json.name,
                members: json.team_members.map((member: any) => ({
                    id: member.id,
                    name: member.username,
                    email: member.email.toLowerCase(),
                    role: member.is_organizator ? "organizer" : "user",
                    age: member.age,
                    city: member.city,
                    workExp: member.work_experience,
                })),
                creator: json.creator,
            }
        })
    }

    return [];
}