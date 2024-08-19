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
    return response.status === 200
}