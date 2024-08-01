import { IUser } from "@/models/IUser.ts";
import apiClient from "@/api-client.ts";

type UpdateProfilePayload = {
    name: string,
    age: number | null,
    city: string,
    workExp: number | null,
}

export default async function updateProfile(payload: UpdateProfilePayload): Promise<IUser | null> {
    const response = await apiClient({
        method: 'PATCH',
        url: '/profile',
        data: {
            username: payload.name,
            age: payload.age,
            city: payload.city,
            work_experience: payload.workExp,
        },
    })
    
    if (response.status == 201) {
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