import { IResume } from "@/models/IResume.ts";
import apiClient from "@/api-client.ts";

export async function fetchResume(userId: number, hackathonId: string): Promise<IResume | null> {
    const response = await apiClient({
        method: 'GET', 
        url: `/resumes/get?user_id=${userId}&hackathon_id=${hackathonId}`,
    })
    if (response.status === 200) {
        return {
            id: response.data.id,
            user: response.data.user,
            bio: response.data.bio,
            hackathonId: hackathonId,
            techStack: response.data.tech,
            softSkills: response.data.soft,
            githubLink: response.data.github,
            hhLink: response.data.hh,
            telegram: response.data.telegram,
            personalWebsite: response.data.personal_website,
            role: response.data.role,
        }
    }
    
    return null
}