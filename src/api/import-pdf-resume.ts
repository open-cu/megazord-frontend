import apiClient from "@/api-client.ts";

type PdfResumeResponse = {
    bio: string
    hards: string[]
    softs: string[]
}

export default async function importPDFResume(file: File): Promise<PdfResumeResponse | null > {
    const formData = new FormData()
    formData.append('pdf', file)
    
    const response = await apiClient.post(
        '/resumes/suggest-resume-pdf',
        formData,
    )

    if (response.status === 200) {
        return response.data
    }

    return null
}