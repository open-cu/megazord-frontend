import apiClient from "@/api-client.ts";

type Payload = {
    hh?: string,
    telegram?: string,
    github?: string,
    bio?: string,
    soft?: string[]
    tech?: string[]
}

export default async function createCustomResume(hackathonId: number, payload: Payload = {}): Promise<boolean> {
    const response = await apiClient({
        method: 'post',
        url: '/resumes/create/custom',
        data: {
            hh: payload.hh ?? '',
            telegram: payload.telegram ?? '',
            github: payload.github ?? '',
            hackathon_id: hackathonId,
            pdf_link: '',
            bio: payload.bio ?? '',
            soft: payload.soft ?? [],
            tech: payload.tech ??  [],
            personal_website: '',
        },
    })

    return response.status === 201
}