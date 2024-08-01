import { IVacancySuggestion } from "@/models/IVacancySuggestion.ts";
import apiClient from "@/api-client.ts";


export default async function getVacanciesSuggestions(resumeId: number): Promise<IVacancySuggestion[]> {
    const response = await apiClient({
        method: 'get',
        url: `/teams/suggest_vacansions_for_specific_user/${resumeId}`,
    })
    
    if (response.status === 200) {
        return (response.data.vacantions as any[]).map(item => {
            return {
                id: item.id,
                name: item.name,
                keywords: item.keywords,
                team: {
                    id: item.team.id,
                    name: item.team.name,
                    members: item.team.team_members.map((member: any) => ({
                        id: member.id,
                        name: member.name,
                        email: member.email,
                        role: member.is_organizator ? "organizer" : "user",
                        age: member.age,
                        city: member.city,
                        workExp: member.work_experience,
                    })),
                    creator: item.creator,
                    hackathonId: item.hackathon_id,
                }
            }
        })
    }
    
    return []
}
