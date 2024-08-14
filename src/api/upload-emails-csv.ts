import {client} from "@/api-client.ts";

export default async function uploadEmailsCsv(hackathon_id: number, file: File): Promise<boolean> {
    const form = new FormData()
    form.append('csv_file', file)
    return await client.post(`/hackathons/${hackathon_id}/upload_emails`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(() => true).catch(() => false);
}