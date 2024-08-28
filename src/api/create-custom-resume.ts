import apiClient, {client} from "@/api-client.ts";

type Payload = {
    hh?: string,
    telegram?: string,
    github?: string,
    bio?: string,
    soft?: string[]
    tech?: string[]
}

export default async function createCustomResume(hackathonId: string, payload: Payload = {}): Promise<boolean> {
    const response = await client.post(
        '/resumes/create/custom',
        {
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
        true
    )
    return response.status === 201
}