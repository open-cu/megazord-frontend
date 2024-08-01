import apiClient from "@/api-client.ts";

export type EditResumePayload = {
    bio: string;
    tech: string[]
    soft: string[]
    github: string
    hh: string
    telegram: string
    personalWebsite: string
}

export async function editResume(id: number, payload: EditResumePayload): Promise<boolean> {
    const response = await apiClient({
        method: 'patch',
        url: '/resumes/edit',
        data: {
            bio: payload.bio,
            hackathon_id: id,
            tech: payload.tech,
            soft: payload.soft,
            github: payload.github,
            hh: payload.hh,
            telegram: payload.telegram,
            personal_website: payload.personalWebsite,
        }
    })
    
    return response.status === 200;
}