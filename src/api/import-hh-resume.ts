import apiClient from "@/api-client.ts";

type HHResumeResponse = {
    bio: string
    hards: string[]
    softs: string[]
}

export default async function importHHResume(link: string): Promise<HHResumeResponse | null > {
    const response = await apiClient({
        method: 'post',
        url: '/resumes/suggest-resume-hh',
        data: { link }
    })

    if (response.status === 200) {
        return response.data
    }

    return null
}