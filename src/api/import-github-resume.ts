import apiClient from "@/api-client.ts";

type GithubResumeResponse = {
    bio: string
    hards: string[]
    softs: string[]
}

export default async function importGithubResume(link: string): Promise<GithubResumeResponse | null > {
    const response = await apiClient({
        method: 'post', 
        url: '/resumes/suggest-resume-github',
        data: { link }
    })
    
    if (response.status === 200) {
        return response.data
    }
    
    return null
}