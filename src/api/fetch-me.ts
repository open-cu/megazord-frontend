import { IUser } from "@/models/IUser.ts";
import apiClient from "@/api-client.ts";

export default async function fetchMe(): Promise<IUser | null> {
    const response = await apiClient({
        method: 'get', 
        url: '/profile'
    })
    
    if (response.status == 200) {
        return {
            id: response.data.id,
            name: response.data.username,
            email: response.data.email,
            role: response.data.is_organizator ? 'organizer' : 'user',
            age: response.data.age,
            city: response.data.city,
            workExp: response.data.work_experience,
        }
    }
    
    return null
}