import apiClient from "@/api-client.ts";
import { IUser } from "@/models/IUser";

export default async function fetchProfileById(id: number): Promise<IUser | null>  {
    const response = await apiClient({
        method: 'get', 
        url: `/profiles/${id}`
    })
    
    if (response.status == 200) {
        const json = response.data;

        return { 
            id: id,
            name: json.username,
            email: json.email,
            role: json.is_organizator ? "organizer" : "user",
            age: json.age,
            city: json.city,
            workExp: json.work_experience,
        }
    }
        return null;
    }