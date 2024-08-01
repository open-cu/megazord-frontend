import apiClient from "@/api-client.ts";
import { IHackathon } from "@/models/IHackathon.ts";

export default async function fetchMyHackathons(): Promise<IHackathon[]>  {
    const response = await apiClient({
        method: 'get', 
        url: '/myhackathons'
    })
    
    if (response.status == 200) {
        return (response.data as any[]).map(json => {
            return { 
                id: json.id,
                name: json.name,
                description: json.description,
                min_participants: json.min_participants,
                max_participants: json.max_participants,
                imageCover: json.image_cover,
                participants: json.participants.map((e: any) => ({
                    id: e.id,
                    name: e.username,
                    email: e.email,
                    role: e.is_organizator ? 'organizer' : 'user',
                    age: e.age,
                    city: e.city,
                    workExp: e.work_experience,
                })),
                teamsIds: [],
                minParticipants: json.min_participants,
                maxParticipants: json.max_participants,
            }
        })
    }
    
    return []
}