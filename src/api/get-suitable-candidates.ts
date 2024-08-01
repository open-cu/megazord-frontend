import apiClient from "@/api-client.ts";
import { IMemberSuggestion } from "@/models/IMemberSuggestion.ts";

export default async function getSuitableCandidates(vacationId: number): Promise<IMemberSuggestion[]> {
    const response = await apiClient({
        method: 'get',
        url: `/teams/suggest_users_for_specific_vacansion/${ vacationId }`
    })

    if (response.status === 200) {
        return response.data.users.map((item: any) => ({
            user: {
                id: item.id,
                name: item.username,
                email: item.email,
                role: item.is_organizator ? "organizer" : "user",
                age: item.age,
                city: item.city,
                workExp: item.work_experience,
            },
            matches: item.keywords,
            bio: item.bio,
        }))
    }
    
    return []
}